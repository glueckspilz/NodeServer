var express = require('express');
var path = require('path');
var config = require('../cfg/config');


var router = express.Router();



router.use(function (req, res, next) {
    console.log("Someone tried to log in!");
    next();
});



var login = function (req, res) {
    res.sendFile(path.resolve('html/login.html'));
};


router.get('/', login);

router.post('/handle',function(req,res){
    console.log(req.body);
    res.redirect('back');
});


module.exports = router;