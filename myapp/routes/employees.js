var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var employeeDataSchema = new Schema({
 
    name:String,
    lastname:String,
  adress: String,
  email: String,
        number: Number,
    post:String,
        salary: Number ,

}, {collection: 'employee'});

var EmployeeData = mongoose.model('EmployeeData', employeeDataSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/get', function(req, res, next) {
 console.log('cooooooooooooooooool employee');
  EmployeeData.find()
      .then(function(doc) {
        res.json(doc);
});
});
router.get('/delete/:id', function (req, res, next) {
   EmployeeData.findByIdAndRemove(req.params.id, function (err, docs) {
        if (err)
            console.log(err);
    })
    res.end(); 
});
router.post('/add', function(req, res, next) {
  var item = {
        name : req.body.name,
       lastname : req.body.lastname,
        adress : req.body.adress, 
         email : req.body.email,
        number : req.body.number, 
        post : req.body.post, 
       salary : req.body.salary, 
       
  };

  var data = new EmployeeData(item);
  data.save();
     res.json(data);

 
});

router.post('/update/:id', function(req, res, next) {
   var id = req.params.id;

 EmployeeData.findById(id, function(err, doc) {
    if (err) {
     
    }
  doc.name = req.body.name,
       doc.lastname = req.body.lastname,
        doc.adress = req.body.adress, 
         doc.email = req.body.email,
        doc.number = req.body.number, 
        doc.post = req.body.post, 
       doc.number = req.body.number, 
    doc.save();
            res.json(doc);
  })
  
});

router.post('/delete', function(req, res, next) {
  var id = req.body.id;
  EmployeeData.findByIdAndRemove(id).exec();
  res.redirect('/');
});
router.get('/getone/:id', function (req, res) {
  var id = req.params.id;
  console.log("///////",id);
   EmployeeData.findById(id, function (err, doc) {
    res.json(doc);
  });
});

module.exports = router;