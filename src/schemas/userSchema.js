import Joi from 'joi';
import { regexPattern } from '../factories/regexPattern';

export const registerSchema = Joi.object({
  name: Joi.string()
    .pattern(regexPattern('name'))
    .required()
    .label('Por favor, insira um nome válido'),
  email: Joi.string()
    .pattern(regexPattern('email'))
    .required()
    .label('Por favor, insira um email válido'),
  password: Joi.string()
    .pattern(regexPattern('password'))
    .required()
    .label('Por favor, insira uma senha válida'),
  confirmedPassword: Joi.ref('password').label('As senhas não coincidem!'),
});
