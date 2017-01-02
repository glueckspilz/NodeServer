const crypto = require('crypto');
//const iterations = 10000;
const delim = '$$';

function password_hash_raw(password,salt,iterations,callback){

    var pw = new Buffer(password).toString('base64');

    crypto.pbkdf2(pw,salt.toString('base64'),iterations,512,'sha512',function(err,derivedKey){
        var finalString = iterations.toString() + delim + salt.toString('base64') + delim + derivedKey.toString('base64');
        callback(err,finalString);
    });
}

function password_hash(password,iterations,callback){
    var salt = crypto.randomBytes(128);
    password_hash_raw(password,salt,iterations,callback);
}


function password_verify(password,hash,callback){
    var tokens = hash.split(delim);


    password_hash_raw(password,tokens[1],parseInt(tokens[0]),function(err,finalString){
    if(!err){
        if(finalString === hash){
            callback(true);
        }
        else{
            callback(false);            
        }
    }else{
        console.log('ERROR');
    }
});
}

module.exports.password_hash = password_hash;
module.exports.password_verify = password_verify;




