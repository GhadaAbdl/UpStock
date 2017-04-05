var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Product = new Schema({
	  quantity: {type: Number, required: true},
  unitPrice: Number,
  totalPrice : Number,
        packPrice : Number,
        temperture : Number,
        humidity : Number,
        tag : String
   
});
module.exports = mongoose.model('Product', Product);