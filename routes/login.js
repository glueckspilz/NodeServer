var express = require('express');
var mysql = require('mysql');
var secu_crypto = require('../secu_crypto');
var path = require('path');
var config = require('../cfg/config');
var passport = require('passport');


var router = express.Router();

var connection = mysql.createConnection(config.mysql);


function login(req, res) {
    res.sendFile(path.resolve('html/login.html'));
}

function handleLogin(req,res){
    res.redirect('/admin');
}

function logout(req,res){
    req.logout();
    res.redirect('/');
}

router.get('/', login);
router.get('/logout', logout);


router.post('/login',passport.authenticate('local',{failureRedirect: '/login'}),handleLogin);


module.exports = router;