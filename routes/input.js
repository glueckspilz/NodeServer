var express = require('express');
var mysql = require('mysql');
var path = require('path');
var config = require('../cfg/config');

var mysql_connection = mysql.createConnection(config.mysql);

var router = express.Router();




var input = function (req, res) {
    res.sendFile(path.resolve('html/input.html'));
};


router.get('/', input);


module.exports = router;