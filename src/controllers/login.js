import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { connection } from '../database/database.js';

export default async function login(req, res) {
  const { email, password } = req.body;

  try {
    const findRegisteredUser = await connection.query(
      'SELECT * FROM users WHERE email = $1;',
      [email]
    );

    if (findRegisteredUser.rowCount === 0) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }

    const hashedPassword = findRegisteredUser?.rows[0]?.password;
    const matchPassword = bcrypt.compareSync(password, hashedPassword);
    const userId = findRegisteredUser?.rows[0]?.id;

    if (!matchPassword) {
      return res.status(401).send({ message: 'Senha incorreta' });
    }

    const loggedUsers = await connection.query(
      'INSERT INTO logged_users (user_id, token) VALUES ($1, $2) RETURNING *;',
      [userId, uuid()]
    );

    const userCredentials = {
      userId: findRegisteredUser.rows[0].id,
      name: findRegisteredUser.rows[0].name,
      token: loggedUsers.rows[0].token,
    };

    res.status(202).send(userCredentials);
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Ocorreu um erro inesperado, tente mais tarde.' });
  }
}
