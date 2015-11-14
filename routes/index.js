'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Room = require('../models/room');


router.get('/', function(req, res){

  Room.find({}, function(err, rooms){
    // if (err) return res.status(400).send(err.message);

    res.render('index', {rooms: rooms});
  });

});

module.exports = router;
