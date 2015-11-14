'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Room = require('../models/room');
var Item = require('../models/item');

router.get('/', function(req, res){

    // documentation says this way
    // Room.find({}).populate('items').exec(function(err, rooms){
    //   res.send(rooms);
    // });

    // callback function inside find is ok
    // Room.find({}, function(err, rooms){
    //   res.status(err ? 400 : 200).send(err || rooms);
    // }).populate('items');

    // limit the number of rooms in the get response
    // Room.find({}, function(err, rooms){
    //   res.status(err ? 400 : 200).send(err || rooms);
    // }).limit(2).populate('items');

    // select certain fields from items
    // Room.find({}, function(err, rooms){
    //   res.status(err ? 400 : 200).send(err || rooms);
    // }).select('name');



    Room.find({}, function(err, rooms){
      console.log(rooms);
      res.send(rooms);
    });
});

router.get('/:roomId/items', function(req, res){
  // console.log(req.params.roomId);
  Room.findById(req.params.roomId, function(err, room){
    // if (err) return res.status(400).send(err.message);

    console.log('room:', room);
    res.render('room', {room: room});
  }).populate('items');
})


router.put('/:roomId/addItem/:itemId', (req, res) => {
  console.log(req.params);
  Room.findById(req.params.roomId, function(err, room){
    if (err) return res.status(400).send(err.message);
    Item.findById(req.params.itemId, function(err, item){
      if (err) return res.status(400).send(err.message);

      if (room.items.indexOf(item._id) === -1){
        room.items.push(item._id);
        room.save(function(err){
          res.status(err ? 400 : 200).send(err ? 'item add failed' : "item added to room");
        });
      } else {
        res.status(400).send('item already in room');
      }

    });

  })
});

//
// router.get('/id/:id', (req, res) => {
//   console.log('PARAMS:', req.params.id);
//   Item.findById(req.params.id, function(err, item){
//     console.log(item);
//     res.send(item);
//   });
// });
//
router.post('/', function(req, res){
  console.log(req.body);
  Room.addRoom(req.body, function(err, newRoom){
    res.status(err ? 400 : 200).send(err ? 'room save failed' : newRoom._id);
  });
});

module.exports = router;
