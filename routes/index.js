var express = require('express');
var router = express.Router();
var path = require('path');
var config = require('../cfg/config');


var index = function (req, res) {
    res.sendFile(path.resolve("html/index.html"));
};

router.get('/', index);

module.exports = router;