'use strict';

var mongoose = require('mongoose');

var Item;

var itemSchema = mongoose.Schema({
  name: String,
  value: Number,
  description: String,
  createdAt: {
    type: Date,
    required: true,
    default: new Date()
  }
});

itemSchema.statics.addItem = function(item, cb){
  var newItem = new Item(item);
  newItem.save(cb, newItem);
}

Item = mongoose.model('Item', itemSchema);

module.exports = Item;
