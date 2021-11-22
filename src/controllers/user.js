import connection from '../database/database.js';
import userCredentials from '../factories/userCredentials.js';

export default async function user(req, res) {
  const token = req.headers.authorization?.replace('Bearer ', '');

  try {
    const findLoggedUsers = await connection.query(
      'SELECT * FROM logged_users WHERE token = $1;',
      [token]
    );

    if (findLoggedUsers.rowCount === 0) {
      return res.status(205).send({
        message: 'Falha de autenticação',
      });
    }

    const subscription = await userCredentials(findLoggedUsers.rows[0].user_id);

    if (!subscription) return res.sendStatus(204);

    return res.status(200).send(subscription);
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Ocorreu um erro inesperado, tente mais tarde.' });
  }
}
