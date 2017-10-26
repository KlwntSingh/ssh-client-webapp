var dao = require('dao/LoginDao.js');


module.exports.isValidUser = function(obj, cb){
    dao.checkUserAndPassword(obj, cb)
}
