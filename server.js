require('dotenv/config');

const express = require('express');
const Transaction = require('./controllers/transaction');
const login = require('./controllers/login');
const User = require('./controllers/user');
const error = require('./middlewares/error');
const cors = require('cors');
const tokenValidation = require('./middlewares/tokenValidation');

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.post('/signup', User.create);
app.post('/login', login);
app.post('/transaction', tokenValidation, Transaction.create);
app.get('/transaction', tokenValidation, Transaction.getById);
app.get('/user', tokenValidation, User.getById);

app.use(error);

app.listen(3333);