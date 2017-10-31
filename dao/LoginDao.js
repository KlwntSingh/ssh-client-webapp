var pool = require('./index.js');


module.exports.checkUserAndPassword = function(obj, cb){
    console.log(obj);
    var query = pool.query('SELECT * FROM users WHERE user = ? and password = ? limit 1',[obj.user, obj.password], function(err, rs){
        if(err){
            return cb(err);
        }else{
            console.log(rs);
            if(rs && rs.length > 0){
                return cb(null, rs[0]);
            }else{
                return cb('User Does not Exists');
            }
        }

    })

}
