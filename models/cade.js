'use strict';
var mongoose = require('mongoose');

var Cade;

var cadeSchema = mongoose.Schema({
  name: String,
  description: {
    type: String,
    default: 'willing slave'
  },
  image: {
    type: String,
    default: "/images/cade.png"
  }
});

cadeSchema.statics.addCade = function(cade, cb){
  var newCade = new Cade(cade);
  newCade.save(cb, newCade);
}

Cade = mongoose.model('Cade', cadeSchema);

module.exports = Cade;
