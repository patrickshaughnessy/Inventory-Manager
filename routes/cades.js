'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Cade = require('../models/cade');
var Dungeon = require('../models/dungeon')


router.post('/', function(req, res){
  Cade.addCade(req.body, function(err, cade){
    if (err) res.status(400).send(err);
    res.send(cade);
  })
})

module.exports = router;
