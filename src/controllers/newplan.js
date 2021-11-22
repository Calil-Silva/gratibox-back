import connection from '../database/database.js';
import { purchaseSchema } from '../schemas/purchaseSchema.js';

export default async function newplan(req, res) {
  const {
    plan, deliveryDate, products, adress
  } = req.body;

  const token = req.headers.authorization?.replace('Bearer ', '');

  const {
    street, zipCode, city, state
  } = adress;

  const handleFullAdress = `${street}, ${city}/${state} - ${zipCode}`;

  const { error: invalidRequest } = purchaseSchema.validate(req.body, {
    abortEarly: false,
  });

  try {
    const userCredentials = await connection.query(
      'SELECT * FROM logged_users WHERE token = $1;',
      [token]
    );

    if (!token || userCredentials.rowCount === 0) {
      return res.status(401).send({ message: 'Acesso não autorizado.' });
    }

    if (invalidRequest) {
      return res.status(400).send({ message: invalidRequest.message });
    }

    const userId = userCredentials.rows[0].user_id;

    const findUserPlan = await connection.query(
      'SELECT * FROM aux WHERE user_id = $1;',
      [userId]
    );

    if (findUserPlan.rowCount > 0) {
      return res
        .status(409)
        .send({ message: 'Só é possível um plano por usuário' });
    }

    const planId = (
      await connection.query('SELECT id FROM plans WHERE name = $1;', [plan])
    ).rows[0].id;

    const productsId = (
      await connection.query('SELECT id FROM products WHERE name = ANY ($1);', [
        products,
      ])
    ).rows.map((product) => product.id);

    productsId.forEach(async (productId) => {
      await connection.query(
        'INSERT INTO aux (user_id, plan_id, product_id, date) VALUES ($1, $2, $3, $4);',
        [userId, planId, productId, deliveryDate]
      );
    });

    await connection.query(
      'INSERT INTO adress (name, user_id) VALUES ($1, $2);',
      [handleFullAdress, userId]
    );

    return res.status(200).send({ message: 'Gratidão' });
  } catch (error) {
    return res
      .status(500)
      .send({ message: 'Ocorreu um erro inesperado, tente mais tarde.' });
  }
}
