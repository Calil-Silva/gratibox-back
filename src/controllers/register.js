import connection from '../database/database.js';
import { registerSchema } from '../schemas/userSchema.js';

export default async function register(req, res) {
  const { name, email, password } = req.body;
  const { error: invalidRequest } = registerSchema.validate(req.body);

  try {
    if (invalidRequest) return res.status(406).send(invalidRequest.message);

    await connection.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
      [name, email, password]
    );
    return res.status(201).send({ message: 'Você é grato!' });
  } catch (error) {
    return res.status(500).send({
      message: 'Ocoreru um erro inesperado, por favor tente mais tarde',
    });
  }
}
