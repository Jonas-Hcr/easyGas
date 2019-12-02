var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

const database = require('./config/database');
database('mongodb://localhost:27017/easyGas');

const cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

const Carro = require('./routes/Carro');
app.use('/Carro', Carro);

const Usuario = require('./routes/Usuario');
app.use('/Usuario', Usuario);

const Abastecimento = require('./routes/Abastecimento');
app.use('/Abastecimento', Abastecimento);

const Rota = require('./routes/Rota');
app.use('/Rota', Rota);

const Quilometragem = require('./routes/Quilometragem');
app.use('/Quilometragem', Quilometragem);

module.exports = app;
