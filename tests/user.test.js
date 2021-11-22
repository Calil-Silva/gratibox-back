/* eslint-disable no-undef */
import supertest from 'supertest';
import '../src/setup/setup.js';
import connection from '../src/database/database.js';
import { app } from '../src/app.js';
import { v4 as uuid } from 'uuid';
import { createNewUser } from './factories/userFactory.js';
import { createSession } from './factories/sessionsFactory.js';
import {
  mockedSubscription,
  mockedSubscriptionFakeZipCode,
} from './mocks/mocks.js';

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

  test('Should return status code 200 if user is authenticated', async () => {
    const token = await createSession();

    const result = await agent
      .get('/user')
      .set('Authorization', `Bearer ${token}`);
    expect(result.status).toEqual(200);
  });
});

describe('POST /newplan', () => {
  beforeEach(async () => {
    await connection.query('DELETE FROM logged_users;');
    await connection.query('DELETE FROM users;');
    await createNewUser();
  });

  afterEach(async () => {
    await connection.query('DELETE FROM logged_users;');
    await connection.query('DELETE FROM users;');
  });

  test('Should return status code 401 if user credentials are invalid', async () => {
    const subscription = mockedSubscription;
    const fakeToken = uuid();
    const result = await agent
      .post('/newplan')
      .set('Authorization', `Bearer ${fakeToken}`)
      .send(subscription);
    expect(result.status).toEqual(401);
    expect(result.body).toHaveProperty('message');
  });

  test('Should return status code 400 if some information of subscription plans is missing', async () => {
    const subscription = mockedSubscriptionFakeZipCode;
    const token = await createSession();
    const result = await agent
      .post('/newplan')
      .set('Authorization', `Bearer ${token}`)
      .send(subscription);
    expect(result.status).toEqual(400);
    expect(result.body).toHaveProperty('message');
  });

  test('Should return status code 409 if user already have subscription', async () => {
    const subscription = mockedSubscription;
    const token = await createSession();
    const id = (await connection.query('SELECT id FROM users;')).rows[0].id;
    await connection.query(
      'INSERT INTO aux (user_id, plan_id, product_id, date) VALUES ($1, $2, $3, $4);',
      [id, 1, 1, 'Quarta']
    );
    const result = await agent
      .post('/newplan')
      .set('Authorization', `Bearer ${token}`)
      .send(subscription);
    expect(result.status).toEqual(409);
    expect(result.body).toHaveProperty('message');
  });

  test('Should return status code 200 if all parameters are right', async () => {
    const subscription = mockedSubscription;
    const token = await createSession();
    const result = await agent
      .post('/newplan')
      .set('Authorization', `Bearer ${token}`)
      .send(subscription);
    expect(result.status).toEqual(200);
    expect(result.body).toHaveProperty('message');
  });
});
