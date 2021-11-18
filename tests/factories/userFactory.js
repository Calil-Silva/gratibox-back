import { mockedUser } from '../mocks/mocks';
import { connection } from '../../src/database/database';

export async function createNewUser() {
  const { name, email, password } = mockedUser;

  const newUser = (
    await connection.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;',
      [name, email, password]
    )
  ).rows[0].id;

  return newUser;
}
