'use strict';
var mongoose = require('mongoose');

var Dungeon;

var dungeonSchema = mongoose.Schema({
  name: String,
  description: {
    type: String,
    default: 'a place to keep all your willing slaves'
  }
  // image: String
});

dungeonSchema.statics.addDungeon = function(dungeon, cb){
  var newDungeon = new Dungeon(dungeon);
  newDungeon.save(cb, newDungeon);
}

Dungeon = mongoose.model('Dungeon', dungeonSchema);

module.exports = Dungeon;
