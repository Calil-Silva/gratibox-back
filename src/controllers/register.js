import bcrypt from 'bcrypt';
import { connection } from '../database/database.js';
import { registerSchema } from '../schemas/userSchema.js';

export default async function register(req, res) {
  const { name, email, password } = req.body;
  const { error: invalidRequest } = registerSchema.validate(req.body, {
    abortEarly: false,
  });
  const passwordErrMsg = '"confirmedPassword" must be [ref:password]';
  const confirmedPasswordError = invalidRequest?.message === passwordErrMsg;
  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    if (invalidRequest && confirmedPasswordError) {
      return res.status(406).send({ message: 'As senhas não coincidem!' });
    }

    if (invalidRequest) {
      return res.status(406).send({ message: invalidRequest.message });
    }

    const findRegisteredUser = await connection.query(
      'SELECT * FROM users WHERE email = $1;',
      [email]
    );

    if (findRegisteredUser.rowCount !== 0) {
      return res.status(409).send({ message: 'Usuário já cadastrado' });
    }

    await connection.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3);',
      [name, email, hashedPassword]
    );
    return res.status(201).send({ message: 'Você é grato!' });
  } catch (error) {
    return res.status(500).send({
      message: 'Ocoreru um erro inesperado, por favor tente mais tarde',
    });
  }
}
