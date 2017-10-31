var config = require('config.json');
var mysql = require('mysql');

var databaseConfig = config.database;


var mysql = require('mysql');
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : databaseConfig.host,
  user            : databaseConfig.user,
  password        : databaseConfig.password,
  port : databaseConfig.port,
  database        : databaseConfig.database
});

module.exports = pool;


