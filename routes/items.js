'use strict';

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Item = require('../models/item');
var Room = require('../models/room');

router.get('/', function(req, res){

    Item.find({}, function(err, items){
      console.log(items);
      res.send(items);
    });


    // sort by value of items
    // Item.find({}, function(err, items){
    //   res.status(err ? 400 : 200).send(err || items);
    // }).sort({value: -1});


    // other things to do:
    // .populate()
    // .sort()
    // .limit()
    // .select()
    // .where
    // .where().gt()
    // .where().lt()

});

// router.get('/id/:id', (req, res) => {
//   console.log('PARAMS:', req.params.id);
//
//   Item.findById(req.params.id, function(err, item){
//     console.log(item);
//     res.send(item);
//   });
// });

router.post('/', function(req, res){
  // var roomId = req.body.room

  Item.addItem(req.body, function(err, newItem){
    console.log(newItem);
    res.status(err ? 400 : 200).send(err || newItem._id);
    // console.log(newItem._id);
    // Room.findById(roomId, function(err, room){
    //   if (err) return res.status(400).send(err.message);
    //   room.items.push(newItem._id);
    //   room.save(function(err){
    //     res.status(err ? 400 : 200).send(err ? 'item add failed' : "item added to room")
    //     res.redirect('/');
    //   });
    // });
  });
});

router.delete('/', function(req, res){

  Item.findByIdAndRemove(req.body.clickedId, function(err, item){
    if (err) res.status(400).send(err);
    res.send(item._id);
  });
})


module.exports = router;
