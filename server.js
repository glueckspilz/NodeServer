/*Imports : System*/
const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');
/*Imports : User*/
var config = require('./cfg/config');
var route_index = require('./routes/index');
var route_login = require('./routes/login');
var route_admin = require('./routes/admin');


function init(){
    var init_obj = new Object();
    init_obj.credentials = new Object();

    /*Init*/
    init_obj.app = express();

    /*Setting up Middleware */
    init_obj.app.use(express.static('public'));
    init_obj.app.use(bodyParser.json());
    init_obj.app.use(bodyParser.urlencoded({
        extended: true
    }));

    /*Setting up the routes*/
    init_obj.app.use('/', route_index);
    init_obj.app.use('/login', route_login);
    init_obj.app.use('/admin',route_admin);

    init_obj.credentials.key = fs.readFileSync(config.server.key,'utf8');
    init_obj.credentials.cert = fs.readFileSync(config.server.cert,'utf8');

    return init_obj;
}


var SRV = init();

/*Start the Server*/
var Server = https.createServer(SRV.credentials,SRV.app);
Server.listen(config.server.port);

console.log('Server Started on Port: ' + config.server.port);


