var config = {};

/*Objects*/
config.server = {};
config.mysql = {};


/*Definitions*/
config.mysql.host = "localhost";
config.mysql.user = "root";
config.mysql.password = "toor";
config.mysql.database = "SecuMod";



config.server.port = 5566;
config.server.cert = "ssl/server.crt";
config.server.key = "ssl/server.key";


module.exports = config;











