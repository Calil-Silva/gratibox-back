import supertest from 'supertest';
import '../src/setup/setup.js';
import { app } from '../src/app.js';
import { connection } from '../src/database/database.js';
import { mockedUser } from './mocks/mocks.js';
import { createNewUser } from './factories/userFactory.js';

const agent = supertest(app);

afterAll(async () => {
  connection.end();
});

describe('POST /register', () => {
  beforeEach(async () => {
    await connection.query('DELETE FROM users;');
    await createNewUser();
  });

  afterEach(async () => {
    await connection.query('DELETE FROM users;');
  });

  test('Should return status code 201 when all parameters are correct,', () => {});
});
