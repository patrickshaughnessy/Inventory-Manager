'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/', function(req, res){
  res.render('upstairs');
});

module.exports = router;
