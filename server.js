/*Imports : System*/
var fs = require('fs');
var mysql = require('mysql');
var https = require('https');
var express = require('express');
var passport = require('passport');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var Strategy = require('passport-local').Strategy; 


/*Imports : User*/
var config = require('./cfg/config');
var secu_crypto = require('./secu_crypto');
var route_index = require('./routes/index');
//var secu_crypto = require('./secu_crypto');
var route_login = require('./routes/login');
var route_admin = require('./routes/admin');


var connection = mysql.createConnection(config.mysql);


function init(){

    passport.use(new Strategy(function(username,password,cb){
        connection.query("SELECT * FROM Users WHERE Username=?",[username],function(err, rows, fields){
            if(err){
                return cb(err);
            }
            if(rows.length == 0){
                return cb(null,false);
            }else{
                secu_crypto.password_verify(password,rows[0].Password,function(succ){
                    if(succ){
                        return cb(null,rows[0]);
                    }else{
                       return cb(null,false);
                    }
                });
            }
        });
    }));


    passport.serializeUser(function(user, cb) {
        cb(null, user.UserID);
    });

    passport.deserializeUser(function(id, cb) {        
        connection.query("SELECT * FROM Users WHERE UserID=?",[id],function(err, rows, fields){
            if(err){
                return cb(err);
            }else{
                cb(null,rows[0]);
            }
        });

    });

    var init_obj = new Object();
    init_obj.credentials = new Object();

    /*Init*/
    init_obj.app = express();

    /*Setting up Middleware */
    init_obj.app.use(express.static('public'));
    init_obj.app.use(cookieParser());
    init_obj.app.use(bodyParser.json());
    init_obj.app.use(bodyParser.urlencoded({extended: true }));
    init_obj.app.use(expressSession({secret: 'secret key' /*WARNING UNSAFE!!*/,resave: false , saveUninitialized: false}));
    init_obj.app.use(passport.initialize());
    init_obj.app.use(passport.session());
    
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


