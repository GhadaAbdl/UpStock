var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var ProductSchema = new Schema({
  quantity: {type: Number, required: true},
  unitPrice: Number,
  totalPrice : Number,
        packPrice : Number,
        temperture : Number,
        idealtemperature: Number,
        humidity : Number,
        idealhumidity : Number,
        tag : String

}, {collection: 'Product'});
var product  = mongoose.model('product', ProductSchema);
module.exports={
      product: product
};

