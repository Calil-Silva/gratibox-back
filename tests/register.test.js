import supertest from 'supertest';
import '../src/setup/setup.js';
import { app } from '../src/app.js';
import { connection } from '../src/database/database.js';
import { mockedUser } from './mocks/mocks.js';

const agent = supertest(app);

afterAll(async () => {
  connection.end();
});

describe('POST /register', () => {
  beforeEach(async () => {
    await connection.query('DELETE FROM users;');
  });

  afterEach(async () => {
    await connection.query('DELETE FROM users;');
  });

  test('Should return status code 201 when all parameters are correct,', async () => {
    const userCredentials = {
      name: mockedUser.name,
      email: mockedUser.email,
      password: mockedUser.password,
      confirmedPassword: mockedUser.confirmedPassword(),
    };

    const result = await agent.post('/register').send(userCredentials);

    expect(result.status).toEqual(201);
    expect(result.body).toHaveProperty('message');
  });

  test('Should return status code 406 if user credentials are incorrect.', async () => {
    const userCredentials = {
      name: mockedUser.name,
      email: mockedUser.email,
      password: mockedUser.password,
      confirmedPassword: mockedUser.fakePassword(),
    };

    const result = await agent.post('/register').send(userCredentials);

    expect(result.status).toEqual(406);
    expect(result.body).toHaveProperty('message');
  });
});
