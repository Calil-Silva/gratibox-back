import { mockedUser } from '../mocks/mocks';

export async function createNewUser() {
  const { name, email, password } = mockedUser;

  await connection.query(
    'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
    [name, email, password]
  );
}
