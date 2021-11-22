/* eslint-disable no-undef */
import supertest from 'supertest';
import '../src/setup/setup.js';
import { v4 as uuid } from 'uuid';
import connection from '../src/database/database.js';
import { app } from '../src/app.js';
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
    await connection.query('DELETE FROM aux;');
    await createNewUser();
  });

  afterEach(async () => {
    await connection.query('DELETE FROM logged_users;');
    await connection.query('DELETE FROM users;');
    await connection.query('DELETE FROM aux;');
  });

  test('Should return status code 205 if user authentication fail', async () => {
    const token = uuid();

    const result = await agent
      .get('/user')
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(205);
    expect(result.body).toHaveProperty('message');
  });

  test('Should return status code 204 if user is authenticated and do not have subscription', async () => {
    const token = await createSession();

    const result = await agent
      .get('/user')
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(204);
  });
});
