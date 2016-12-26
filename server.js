/*Imports : System*/
const express = require('express');
const bodyParser = require('body-parser');
var app = express();


/*Imports : User*/
var config = require('./cfg/config');
var route_index = require('./routes/index');
var route_login = require('./routes/login');
var route_input = require('./routes/input');
var route_admin = require('./routes/admin');


/*Setting up Middleware */
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


/*Setting up the routes*/
app.use('/', route_index);
app.use('/login', route_login);
app.use('/input', route_input);
app.use('/admin',route_admin);

app.listen(config.server.port);

console.log('Server Started!');