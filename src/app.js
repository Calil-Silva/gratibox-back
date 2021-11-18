import express from 'express';
import cors from 'cors';
import register from './controllers/register.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', register);
