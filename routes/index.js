'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// var Room = require('../models/room');


router.get('/', function(req, res){
    res.render('index');
});

module.exports = router;
