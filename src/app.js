import express from 'express';
import cors from 'cors';
import register from './controllers/register.js';
import login from './controllers/login.js';
import user from './controllers/user.js';
// import newplan from './controllers/newplan.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', register);
app.post('/login', login);
app.get('/user', user);
// app.post('/newplan', newplan);
