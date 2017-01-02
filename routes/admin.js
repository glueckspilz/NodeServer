/*Imports: System*/
var secu_crypto = require('../secu_crypto');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var path = require('path');

/*Imports: User*/
var config = require('../cfg/config');

/*MySQL Init */
var connection = mysql.createConnection(config.mysql);




function root(req, res) {
    res.sendFile(path.resolve("html/admin.html"));
};

function getUsers(req, res) {
    connection.query("SELECT * FROM Users", function (err, rows, fields) {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
};

function removeUser(req, res) {
    for (var i = 0; i < req.body.ids.length; i++) {
        connection.query("DELETE FROM Users WHERE UserID=?", [req.body.ids[i]], function (err, rows, fields) {
            if (!err) {
                res.end();
            } else {
                console.log(err);
                res.end();
            }
        });
    }
    res.end();
}

function addUser(req, res) {
    var vals = [];
    for (var o in req.body) {
        vals.push(req.body[o]);
    }
    secu_crypto.password_hash(vals[4],10,function(err,finalString){
        vals[4]=finalString;
        connection.query("INSERT INTO Users VALUES(NULL,?,?,?,?,?)", vals, function (err, rows, fields) {
            if (!err) {
                res.end();
            } else {
                console.log(err);
                res.end();
            }
        });
            
    });
    res.end();
}

function updateUser(req, res) {
    var vals = [];
    for (var o in req.body) {
        vals.push(req.body[o]);
    }
    secu_crypto.password_hash(vals[4],10,function(err,finalString){
        vals[4]=finalString;
        connection.query("UPDATE Users SET FirstName=?, LastName=?, EmailAddress=?, Username=?, Password=? WHERE UserID=? ", vals, function (err, rows, fields) {
            if (!err) {
                res.end();
            } else {
                console.log(err);
                res.end();
            }
        });
    });
    res.end();
}



/*Setup: Routes*/

//GET
router.get('/', root);
router.get('/getUsers', getUsers);


//POST
router.post('/removeUser', removeUser);
router.post('/addUser', addUser);
router.post('/updateUser', updateUser);




module.exports = router;