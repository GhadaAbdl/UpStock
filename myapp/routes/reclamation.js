var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var product = require('../models/product').product;

var reclamationSchema = new Schema({
        tag : String,
        user:String,
        descrition:String
   
}, {collection: 'Reclamation'});
var reclamationData = mongoose.model('reclamationData', reclamationSchema);
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get', function(req, res, next) {
  reclamationData.find()
      .then(function(doc) {
        res.json(doc);
});
});

        
router.post('/addhumi/:tag', function(req, res, next) {
        var tagg=req.params.tag;
       product.find({tag:tagg}).exec(function (err, doc){ 
 
    var item = {
       tag : tagg,
        user: "test",
        descrition: "problem de humidity "+doc[0].humidity+"/"+doc[0].idealhumidity
  };
 
  var data = new reclamationData(item);
  
 data.save();

      res.json(data);
    });
     

      
});
router.post('/addtemp/:tag', function(req, res, next) {
        var tagg=req.params.tag;
       product.find({tag:tagg}).exec(function (err, doc){ 
 
    var item = {
       tag : tagg,
        user: "test",
        descrition: "problem de temperature "+doc[0].temperture+"/"+doc[0].idealtemperature
  };
 
  var data = new reclamationData(item);
  
 data.save();

      res.json(data);
    });
     

      
});
router.post('/addall/:tag', function(req, res, next) {
        var tagg=req.params.tag;
       product.find({tag:tagg}).exec(function (err, doc){ 
 
   
    var item = {
       tag : tagg,
        user: "test",
        descrition: "problem de climat temperature:"+doc[0].temperture+"/"+doc[0].idealtemperature+"!!et humidity : "+doc[0].humidity+"/"+doc[0].idealhumidity
  };
 
  var data = new reclamationData(item);
  
 data.save();

      res.json(data);
    });
     

      
});
      
      
 
  
  
      router.get('/remove/:id', function (req, res, next) {
    reclamationData.findByIdAndRemove(req.params.id, function (err, docs) {
        if (err)
            console.log(err);
    })
    res.writeHead(302, {
  'Location': 'http://localhost:3000/#/reclamation'
 
});
res.end();
});
router.get('/notif', function(req, res, next) {
  reclamationData.find().count(function(err, c) {
          return res.json({ somme: c});
      })
 
});

module.exports = router;