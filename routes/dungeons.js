'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Cade = require('../models/cade');

router.get('/', function(req, res){
  res.render('dungeon');
});

router.get('/getcades', function(req, res){
  Cade.find({}, function(err, cades){
    if(err) res.status(400).send(err);
    res.send(cades);
  });
});

module.exports = router;
