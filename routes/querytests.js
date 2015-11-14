'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.post('/', function(req, res){
  console.log(req.query);
  res.send(req.query);
})

module.exports = router;
