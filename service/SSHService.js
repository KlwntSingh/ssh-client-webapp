fs = require('fs')
path = require('path')
node_ssh = require('node-ssh')


var connectAndExecute = function(obj, cb){
    let ssh = new node_ssh();
    ssh.connect({
      host: obj.host,
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
              sh.dispose();
              var result = chunk.toString('utf8');
              console.log('stderrChunk', result)
              return cb(null, result);
            },
        })
    }).catch(function(err){
        ssh.dispose();
        cb(err);
    })
}

module.exports.connectAndExecute = connectAndExecute; 