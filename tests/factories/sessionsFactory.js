import { connection } from '../../src/database/database';
import { v4 as uuid } from 'uuid';

export async function createSession() {
  const userId = (await connection.query('SELECT id FROM users;')).rows[0].id;

  const token = (
    await connection.query(
      'INSERT INTO logged_users (user_id, token) VALUES ($1, $2) RETURNING token;',
      [userId, uuid()]
    )
  ).rows[0].token;

  return token;
}
