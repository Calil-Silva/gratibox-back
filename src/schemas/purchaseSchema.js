import Joi from 'joi';
import { regexPattern } from './regexPattern.js';

export const purchaseSchema = Joi.object({
  plan: Joi.string()
    .trim()
    .min(6)
    .required()
    .error(new Error('Escolha um plano antes de continuar')),
  deliveryDate: Joi.string()
    .min(1)
    .required()
    .error(new Error('Escolha data de entrega para continuar')),
  products: Joi.array()
    .items(Joi.string().required())
    .max(3)
    .required()
    .error(new Error('Escolha ao menos 1 produto para continuar')),
  adress: Joi.object({
    street: Joi.string()
      .trim()
      .min(3)
      .required()
      .error(new Error('O endereço está incompleto/incorreto')),
    zipCode: Joi.string()
      .pattern(regexPattern('zipCode'))
      .error(new Error('O CEP está incompleto/incorreto')),
    city: Joi.string()
      .trim()
      .min(3)
      .required()
      .error(new Error('O campo cidade está incompleto/incorreto')),
    state: Joi.string()
      .trim()
      .required()
      .error(new Error('O campo estado está incompleto/incorreto')),
  }),
});
