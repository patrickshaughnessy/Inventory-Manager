'use strict';

var PORT = process.env.PORT || 3000;

require('dotenv').load();

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/inventorymanager');
mongoose.connect('mongodb://'+process.env.DB_USER+':'+process.env.DB_PASSWORD+'@ds053764.mongolab.com:53764/inventorymanager' || 'mongodb://localhost/inventorymanager');


var app = express();

app.set('view engine', 'jade');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/', require('./routes/index'));
app.use('/items', require('./routes/items'));
app.use('/rooms', require('./routes/rooms'));
app.use('/querytests', require('./routes/querytests'));

app.use('/upstairs', require('./routes/upstairs'));
app.use('/downstairs', require('./routes/downstairs'));

app.listen(PORT, function(){
  console.log('Now listening on port: ' + PORT);
});
