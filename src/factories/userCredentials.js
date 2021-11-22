import { monthlyDatesFactory, weeklyDatesFactory } from './deliveryDates.js';
import connection from '../database/database.js';

export default async function userCredentials(userId) {
  let deliveryDates;

  const subscriptionIds = await connection.query(
    'SELECT * FROM aux WHERE user_id = $1;',
    [userId]
  );

  const subscriptionDate = subscriptionIds?.rows[0]?.subscription_date;

  const subscriptionProductsIdsArr = subscriptionIds.rows.map(
    (p) => p.product_id
  );

  const subscriptionProducts = (
    await connection.query('SELECT name FROM products WHERE id = ANY ($1);', [
      subscriptionProductsIdsArr,
    ])
  ).rows.map(({ name }) => name);

  const subscriptionPlan = (
    await connection.query('SELECT name FROM plans WHERE id = $1;', [
      subscriptionIds.rows[0].plan_id,
    ])
  ).rows[0].name;

  const cleanDate = subscriptionIds.rows[0].date;

  if (subscriptionPlan === 'Mensal') {
    deliveryDates = monthlyDatesFactory(cleanDate);
  }

  if (subscriptionPlan === 'Semanal') {
    deliveryDates = weeklyDatesFactory(cleanDate);
  }

  const subscription = {
    subPlan: subscriptionPlan,
    subDate: subscriptionDate,
    nextDeliveries: deliveryDates,
    products: subscriptionProducts,
  };

  return subscription;
}
