var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var clientDataSchema = new Schema({
  name: String,
  adress : String,
   email : String,
    number : Number
      
}, {collection: 'clients'});





var ClientData = mongoose.model('ClientData', clientDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get', function(req, res, next) {
 console.log('We are in clients get');
  ClientData.find()
      .then(function(doc) {
        res.json(doc);
});
});
router.post('/add', function(req, res, next) {
  var item = {
        name : req.body.name, 
        adress : req.body.adress,
        email : req.body.email, 
        number : req.body.number
  };
 
  var data = new ClientData(item);
  data.save();

        res.json(data);
});


router.post('/update/:id', function(req, res, next) {
  var id = req.params.id;

  ClientData.findById(id, function(err, doc) {
    if (err) {
      console.error('error, no entry found');
    }
  
        doc.name = req.body.name, 
        doc.adress = req.body.adress,
        doc.email = req.body.email, 
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
    ClientData.findByIdAndRemove(req.params.id, function (err, docs) {
        if (err)
            console.log(err);
    })
});


router.get('/getone/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  ClientData.findById(id, function (err, doc) {
    res.json(doc);
  });
});

module.exports = router;