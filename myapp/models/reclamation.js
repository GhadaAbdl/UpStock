var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var reclamation = new Schema({
        tag : String,
        user:String,
        descrition:String
   
});
module.exports = mongoose.model('Product', Product);