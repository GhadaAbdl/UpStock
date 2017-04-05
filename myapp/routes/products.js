var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productDataSchema = new Schema({
  quantity: {type: Number, required: true},
  unitPrice: Number,
  totalPrice : Number,
        packPrice : Number,
        temperture : Number,
        humidity : Number,
        tag : String

}, {collection: 'Product'});

var ProductData = mongoose.model('ProductData', productDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get', function(req, res, next) {
 console.log('cooooooooooooooooool');
  ProductData.find()
      .then(function(doc) {
        res.json(doc);
});
});
router.post('/#/form-tools', function(req, res, next) {
  var item = {
        quantity : req.body.quantity, 
        unitPrice : req.body.unitPrice,
        totalPrice : req.body.totalPrice, 
        packPrice : req.body.packPrice, 
        temperture : req.body.temperture, 
        humidity : req.body.humidity, 
        tag : req.body.tag
  };

  var data = new ProductData(item);
  data.save();

  res.redirect('/');
});

router.post('/update', function(req, res, next) {
  var id = req.body.id;

  ProductData.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
   doc.quantity = req.body.quantity;
        doc.unitPrice =req.body.unitPrice;
        doc.totalPrice = req.body.totalPrice; 
        doc.packPrice = req.body.packPrice; 
        doc.temperture = req.body.temperture; 
        doc.humidity =req.body.humidity; 
        doc.tag = req.body.tag
    doc.save();
  })
  res.redirect('/');
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  ProductData.findByIdAndRemove(id).exec();
  res.redirect('/');
});

module.exports = router;