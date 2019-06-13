const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//Conectar mongo
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost/restapis', {
  useNewUrlParser: true,
  useFindAndModify: false
});

//Crear servidor
const app = express();

//Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Habilitar cors
app.use(cors());

//Rutas
app.use('/', routes());

//Puerto
app.listen(5000);
