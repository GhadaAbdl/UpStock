const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database
mongoose.connect(config.database);
mongoose.Promise = global.Promise;

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');
const index = require('./routes/index');
var suppliers = require('./routes/suppliers');
var clients = require('./routes/clients');
var reclamation = require('./routes/reclamation');
var products = require('./routes/products');
var employees = require('./routes/employees');





// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());
app.set('views', path.join(__dirname, 'views'));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/', index);
app.use('/suppliers', suppliers);
app.use('/clients', clients);
app.use('/reclamation', reclamation);
app.use('/products', products);
app.use('/employees', employees);


// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
