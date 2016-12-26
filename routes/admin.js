var express = require('express');
var router = express.Router();

var mysql = require('mysql');

var path = require('path');
var config = require('../cfg/config');

var connection = mysql.createConnection(config.mysql);

var admin = function (req, res) {
    res.sendFile(path.resolve("html/admin.html"));
};

var handle = function(req,res){
    connection.query("SELECT * FROM Users",function(err,rows,fields){
        if(!err)
        {
            res.json(rows);
        }else{
            console.log(err);
        }
    });
};

var removeUser = function(req,res){
    for(var i = 0; i< req.body.ids.length;i++){
        connection.query("DELETE FROM Users WHERE UserID=?",[req.body.ids[i]],function(err,rows,fields){
            if(!err)
            {
                res.end();
            }else{
                console.log(err);
                res.end();
            }
        });
    }
    res.end();
}

var addUser = function(req,res){
    var vals = [];
    for(var o in req.body)
    {
        vals.push(req.body[o]);
    }
    
    connection.query("INSERT INTO Users VALUES(NULL,?,?,?,?,?)",vals,function(err,rows,fields){
            if(!err)
            {
                res.end();
            }else{
                console.log(err);
                res.end();
            }
        });
        res.end();
}

var updateUser = function(req,res){
    var vals = [];
    for(var o in req.body)
    {
        vals.push(req.body[o]);
    }
    connection.query("UPDATE Users SET FirstName=?, LastName=?, EmailAddress=?, Username=?, Password=? WHERE UserID=? ",vals,function(err,rows,fields){
            if(!err)
            {
                res.end();
            }else{
                console.log(err);
                res.end();
            }
        });
        res.end();
}

router.get('/', admin);

router.get('/getUsers',handle);

router.post('/removeUser',removeUser);
router.post('/addUser',addUser);
router.post('/updateUser',updateUser);

module.exports = router;