import supertest from 'supertest';
import '../src/setup/setup.js';
import { app } from '../src/app.js';
import { connection } from '../src/database/database.js';
import { createNewUser } from './factories/userFactory.js';

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
    const newUser = await createNewUser();
    console.log(newUser);
    console.log((await connection.query('select * from users;')).rows);
    const result = agent.post('/register').send(newUser);

    expect(result.status).toEqual(201);
    expect(result.body).toHaveProperty('message');
  });
});
