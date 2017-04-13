var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productDataSchema = new Schema({
 quantity: {type: Number, required: true},
    name:String,
    type:String,
  unitPrice: Number,
  totalPrice : Number,
  packPrice : Number,
    tag:String, 
    idealhumidity:Number,
        idealtemperature:Number

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

router.post('/add', function(req, res, next) {
  var item = {
          
        name : req.body.name,
        type : req.body.type,
      quantity : req.body.quantity, 
        unitPrice : req.body.unitPrice,
        totalPrice : req.body.totalPrice, 
        packPrice : req.body.packPrice,
       tag : req.body.tag, 
      idealhumidity : req.body.idealhumidity,
      idealtemperature : req.body.idealtemperature
       
       
  };

  var data = new ProductData(item);
  data.save();
     res.json(data);

 
});



router.post('/update/:id', function(req, res, next) {
   var id = req.params.id;

  ProductData.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
         
        doc.name = req.body.name,
        doc.type =req.body.type,
      doc.quantity = req.body.quantity,
        doc.unitPrice =req.body.unitPrice,
        doc.totalPrice = req.body.totalPrice,
        doc.packPrice = req.body.packPrice,
        doc.tag = req.body.tag,
 

    doc.save();
        res.json(doc);
  })
  
});


 router.get('/getone/:id', function (req, res) {
   var id = req.params.id;
  console.log("///////",id);
  ProductData.findById(id, function (err, doc) {
    res.json(doc);
  });
});


router.get('/delete/:id', function (req, res, next) {
   ProductData.findByIdAndRemove(req.params.id, function (err, docs) {
        if (err)
            console.log(err);
    })
 
res.end();   
});

module.exports = router;