var pool = require('./index.js');


module.exports.checkUserAndPassword = function(obj, cb){

    pool.query('SELECT * FROM USER WHERE username = ? and password = ? and enabled = 1 limit 1',[obj.user, obj.password], function(err, rs){
        
        if(err){
            return cb(err);
        }else{
            if(rs && rs.lenght>0){
                return cb(null, rs[0]);
            }else{
                return cb('User Does not Exists');
            }
        }

    })

}
