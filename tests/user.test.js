/* eslint-disable no-undef */
import supertest from 'supertest';
import '../src/setup/setup.js';
import connection from '../src/database/database.js';
import { app } from '../src/app.js';
import { v4 as uuid } from 'uuid';
import { createNewUser } from './factories/userFactory.js';
import { createSession } from './factories/sessionsFactory.js';

const agent = supertest(app);

afterAll(async () => {
  connection.end();
});

describe('GET /user', () => {
  beforeEach(async () => {
    await connection.query('DELETE FROM logged_users;');
    await connection.query('DELETE FROM users;');
    await createNewUser();
  });

  afterEach(async () => {
    await connection.query('DELETE FROM logged_users;');
    await connection.query('DELETE FROM users;');
  });

  test('Should return status code 205 if user authentication fail', async () => {
    const token = uuid();

    const result = await agent
      .get('/user')
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(205);
    expect(result.body).toHaveProperty('message');
  });

  test('Should return status code 200 if user is authenticated', async () => {
    const token = await createSession();

    const result = await agent
      .get('/user')
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(200);
  });
});
