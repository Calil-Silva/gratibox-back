/* eslint-disable no-undef */
import supertest from 'supertest';
import '../src/setup/setup.js';
import { v4 as uuid } from 'uuid';
import { app } from '../src/app.js';
import connection from '../src/database/database.js';
import { createNewUser } from './factories/userFactory.js';
import { createSession } from './factories/sessionsFactory.js';

const agent = supertest(app);

afterAll(async () => {
  connection.end();
});

describe('DELETE /sigout', () => {
  beforeEach(async () => {
    await createNewUser();
  });
  afterEach(async () => {
    await connection.query('DELETE FROM logged_users;');
    await connection.query('DELETE FROM users;');
  });

  test('Should return status code 200 if token is valid', async () => {
    const token = await createSession();
    const result = await agent
      .delete('/signout')
      .set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(200);
  });

  test('Should return status code 401 if token is invalid', async () => {
    const token = uuid();

    const result = await agent
      .delete('/signout')
      .set('Authorization', `Bearer ${token}`);

    expect(result.status).toEqual(401);
  });
});
