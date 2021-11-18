import Joi from 'joi';
import { regexPattern } from '../factories/regexPattern.js';

export const registerSchema = Joi.object({
  name: Joi.string()
    .pattern(regexPattern('name'))
    .required()
    .error(new Error('Por favor, insira um nome válido')),
  email: Joi.string()
    .pattern(regexPattern('email'))
    .required()
    .error(new Error('Por favor, insira um email válido')),
  password: Joi.string()
    .pattern(regexPattern('password'))
    .required()
    .error(new Error('Por favor, insira uma senha válida')),
  confirmedPassword: Joi.ref('password'),
});
