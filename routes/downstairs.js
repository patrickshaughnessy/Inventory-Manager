'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Room = require('../models/room');
var Item = require('../models/item');

router.get('/', function(req, res){
  Room.find({}, function(err, rooms){
    if (err) return res.status(400).send(err);


// better way - use reduce and concat - also, put in itemSchema.statics:
// itemSchema.statics.findNotInRoom = function(cb){
//   Room.find({}, function(err, rooms){
//     if (err) return cb(err)
//     var itemIds = rooms.reduce(function(itemsIds, room){
//       return itemIds.concat(room.items)
//     }, []);
//     Item.find({_id: {$nin: itemIds}}, cb);
//   });
// };

    var itemsInRooms = [];
    rooms.forEach(function(room){
      if (room.items.length){
        // console.log(room);
        room.items.forEach(function(item){
          itemsInRooms.push(item);
        });
      };
    });
    // console.log('items in room', itemsInRooms);

    // Item.find({"_id":{"$ne":itemsInRooms}}, function(err, items){
    //   if (err) return res.status(400).send(err);
    //   console.log('items', items, 'rooms', rooms);
    Item.find({}, function(err, items){
      if (err) return res.status(400).send(err);
      // console.log('items', items, 'rooms', rooms);

      // console.log('indexof', itemsInRooms.indexOf(items[4]._id));
      //
      // items = items.filter(function(item){
      //   console.log(item._id)
      //   if (itemsInRooms.indexOf(item._id) !== -1){
      //     return item;
      //   }
      // });
      //
      // console.log('post filter', items)
      res.render('downstairs', {rooms: rooms, items: items});
    })
    .nin('_id', itemsInRooms);
  });
});

router.get('/:roomId', function(req, res){
  Room.findById(req.params.roomId, function(err, room){
    if (err) return res.status(400).send(err);
    res.send(room);
  }).populate('items');
});

module.exports = router;
