var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var supplierDataSchema = new Schema({
  name: String,
  adress : String,
   email : String,
   speciality : String,
    number : Number
      
}, {collection: 'suppliers'});

var SupplierData = mongoose.model('SupplierData', supplierDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get', function(req, res, next) {
 console.log('We are in suppliers get');
  SupplierData.find()
      .then(function(doc) {
        res.json(doc);
});
});
router.post('/add', function(req, res, next) {
  var item = {
        name : req.body.name, 
        adress : req.body.adress,
        email : req.body.email, 
        speciality : req.body.speciality, 
        number : req.body.number
  };
 
  var data = new SupplierData(item);
  data.save();

        res.json(data);
});


router.post('/update/:id', function(req, res, next) {
  var id = req.params.id;

  SupplierData.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
  
        doc.name = req.body.name, 
        doc.adress = req.body.adress,
        doc.email = req.body.email, 
        doc.speciality = req.body.speciality, 
        doc.number = req.body.number

           doc.save();
            res.json(doc);

  })
});
/*
router.post('/delete/:id', function(req, res, next) {
  var id = req.body.id;
  SupplierData.findByIdAndRemove(id, function (err, doc) {
    res.json(doc);
  });
});
*/

router.get('/delete/:id', function (req, res, next) {
    SupplierData.findByIdAndRemove(req.params.id, function (err, docs) {
        if (err)
            console.log(err);
    })
});


router.get('/getone/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  SupplierData.findById(id, function (err, doc) {
    res.json(doc);
  });
});

module.exports = router;