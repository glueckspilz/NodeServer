var express = require('express');
var mysql = require('mysql');
var secu_crypto = require('../secu_crypto');
var path = require('path');
var config = require('../cfg/config');


var router = express.Router();

var connection = mysql.createConnection(config.mysql);


function login(req, res) {
    res.sendFile(path.resolve('html/login.html'));
}

function handleLogin(req,res){
   
    var q = "SELECT * FROM Users WHERE Username=" + mysql.escape(req.body.username);
    connection.query(q,function(err,rows,fields){
        if(!err){
            if(rows.length > 0){
                if(secu_crypto.password_verify(req.body.password,rows[0].Password,function(succ){
                    if(succ){
                        res.send('SUCCESS!!');
                        res.end();
                    }else{
                        res.redirect('back');
                        res.end();
                    }
                }));
            }else{
                res.redirect('back');
                res.end();
            }
        }else{
            console.log(err);
            res.end();
        }
    });
}

router.get('/', login);


router.post('/login',handleLogin);


module.exports = router;