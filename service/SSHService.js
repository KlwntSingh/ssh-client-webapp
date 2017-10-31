fs = require('fs')
path = require('path')
node_ssh = require('node-ssh')


var connectAndExecute = function(obj, cb){
    let ssh = new node_ssh();
    console.log(obj);
    ssh.connect({
      host: obj.host,
      port : obj.port,
      username: obj.user,
      privateKey: obj.filePath
    }).then(function(){
        ssh.exec(obj.command, [], {
            cwd: '/home/' + obj.user,
            onStdout(chunk) {
              ssh.dispose();
              var result = chunk.toString('utf8');
              console.log('stdoutChunk', result);
              return cb(null, result);
            },
            onStderr(chunk) {
              ssh.dispose();
              var result = chunk.toString('utf8');
              console.log('stderrChunk', result)
              return cb(null, "Not able to run command");
            },
        })
    }).catch(function(err){
        console.log(err);
        ssh.dispose();
        cb(err);
    })
}

module.exports.connectAndExecute = connectAndExecute; 