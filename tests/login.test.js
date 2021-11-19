/* eslint-disable no-undef */
import supertest from 'supertest';
import '../src/setup/setup.js';
import { app } from '../src/app.js';
import connection from '../src/database/database.js';
import { createNewUser } from './factories/userFactory.js';
import { mockedUser } from './mocks/mocks.js';

const agent = supertest(app);

afterAll(async () => {
  connection.end();
});

describe('POST /login', () => {
  beforeEach(async () => {
    await connection.query('DELETE FROM logged_users;');
    await connection.query('DELETE FROM users;');
  });

  afterEach(async () => {
    await connection.query('DELETE FROM logged_users;');
    await connection.query('DELETE FROM users;');
  });

  test('Should return status code 404 if user is not registered', async () => {
    const newUser = {
      email: mockedUser.email,
      password: mockedUser.password,
    };
    const result = await agent.post('/login').send(newUser);

    expect(result.status).toEqual(404);
    expect(result.body).toHaveProperty('message');
  });

  test('Should return status code 401 if password is incorrect', async () => {
    const userCredentials = await createNewUser();
    const loginCredentials = {
      email: userCredentials.email,
      password: userCredentials.password.slice(-1),
    };
    const result = await agent.post('/login').send(loginCredentials);

    expect(result.status).toEqual(401);
    expect(result.body).toHaveProperty('message');
  });

  test('Should return status code 202 if user is registered and credential are valid', async () => {
    const userCredentials = await createNewUser();
    const loginCredentials = {
      email: userCredentials.email,
      password: userCredentials.notHashed,
    };
    const result = await agent.post('/login').send(loginCredentials);

    expect(result.status).toEqual(202);
    expect(result.body).toHaveProperty('name');
    expect(result.body).toHaveProperty('userId');
    expect(result.body).toHaveProperty('token');
  });
});
