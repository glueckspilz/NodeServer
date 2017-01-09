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

function users(req, res) {
    res.sendFile(path.resolve("html/user.html"));
};

function privileges(req, res) {
    res.sendFile(path.resolve("html/privileges.html"));
};
function sql(req, res){
    res.sendFile(path.resolve("html/sql.html"));
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
    connection.query("SELECT * FROM Users WHERE Username=?",[vals[3]],function (err, rows, fields){
        if(!err){

            if (rows.length==0){
                if (vals[3]==""||vals[3]==undefined||vals[4]==""||vals[4]==undefined){
                    console.log("username and password can't be empty!");//TODO: add user notify
                }else {
		    console.log(vals);
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
            }
        }
        else{
            console.log('User already exists!'); //TODO: add user notify
            res.end();
        }
        }else{
            console.log(err);
            res.end();
        }

    });
}

function updateUser(req, res) {
    var vals = [];
    for (var o in req.body) {
        vals.push(req.body[o]);
    }

    if (vals[3]==""||vals[3]==undefined||vals[4]==""||vals[4]==undefined){
        console.log("username and password can't be empty!");//TODO: add user notify
    }else{	
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
    }
    res.end();
}


function getPrivileges(req, res) {
    connection.query("SELECT * FROM Privileges", function (err, rows, fields) {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
};

function removePrivilege(req, res) {
    for (var i = 0; i < req.body.ids.length; i++) {
        connection.query("DELETE FROM Privileges WHERE PrivilegeID=?", [req.body.ids[i]], function (err, rows, fields) {
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

function addPrivilege(req, res) {
    var vals = [];
    for (var o in req.body) {
        vals.push(req.body[o]);
    }
    connection.query("INSERT INTO Privileges VALUES(NULL,?)",vals ,function(err, rows, fields){
        if(!err){
            res.end();
        }else{
            console.log(err);
            res.end();
        }

    });
    
    res.end();
}

function updatePrivilege(req, res) {
    var vals = [];
    for (var o in req.body) {
        vals.push(req.body[o]);
    }

    res.end();
}
function sendSql(req,res){
    console.log(req.body);
    connection.query(req.body.query,function (err, rows, fields) {
            if (!err) {
                console.log(rows);
                res.send(rows);
            } else {
                console.log(err);
                //res.end();
            }
        res.end();

        });
}


/*Setup: Routes*/

//GET
router.get('/',require('connect-ensure-login').ensureLoggedIn(), root);

router.get('/Users',require('connect-ensure-login').ensureLoggedIn(),users);
router.get('/getUsers',require('connect-ensure-login').ensureLoggedIn(), getUsers);

router.get('/Privileges',require('connect-ensure-login').ensureLoggedIn(),privileges);
router.get('/getPrivileges',require('connect-ensure-login').ensureLoggedIn(),getPrivileges);

router.get('/SQL',require('connect-ensure-login').ensureLoggedIn(),sql);

//POST
router.post('/removeUser', require('connect-ensure-login').ensureLoggedIn(),removeUser);
router.post('/addUser', require('connect-ensure-login').ensureLoggedIn(),addUser);
router.post('/updateUser',require('connect-ensure-login').ensureLoggedIn(), updateUser);

router.post('/removePrivilege',require('connect-ensure-login').ensureLoggedIn(),removePrivilege);
router.post('/addPrivilege',require('connect-ensure-login').ensureLoggedIn(),addPrivilege);
router.post('/updatePrivilege',require('connect-ensure-login').ensureLoggedIn(),updatePrivilege);

router.post('/sendSql',require('connect-ensure-login').ensureLoggedIn(),sendSql);



module.exports = router;
