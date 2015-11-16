'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room;

var roomSchema = mongoose.Schema({
  name: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  // image: String,
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  }
});

roomSchema.statics.addRoom = function(room, cb){
  var newRoom = new Room(room);
  newRoom.save(cb, newRoom);
}

Room = mongoose.model('Room', roomSchema);

module.exports = Room;
