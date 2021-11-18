import { connection } from '../database/database';

export default async function login(req, res) {
  const { email, password } = req.body;

  try {
    const findRegisteredUser = await connection.query(
      'SELECT * FROM users WHERE email = $1;',
      [email]
    );

    if (findRegisteredUser.rowCount !== 0) {
      return res.status(404).send({ message: 'Usuário não encontrado' });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Ocorreu um erro inesperado, tente mais tarde.' });
  }
}
