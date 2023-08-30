const express = require('express');

const routes = require('./routes/index');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.json());

app.use(routes);

app.set('view engine', 'ejs');

app.listen(PORT);
