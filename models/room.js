'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Room;

var RoomSchema = mongoose.Schema({
  name: { type: String, required: true },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  }
});

RoomSchema.statics.addRoom = function(room, cb){
  var newRoom = new Room(room);
  newRoom.save(cb, newRoom);
}

Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
