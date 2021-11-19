import bcrypt from 'bcrypt';
import { mockedUser } from '../mocks/mocks';
import { connection } from '../../src/database/database';

export async function createNewUser() {
  const { name, email, password: notHashed } = mockedUser;
  const hashedPassword = bcrypt.hashSync(notHashed, 10);

  const newUser = (
    await connection.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *;',
      [name, email, hashedPassword]
    )
  ).rows[0];

  return { ...newUser, notHashed };
}
