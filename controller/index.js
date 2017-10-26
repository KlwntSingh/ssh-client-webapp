var app = require('express')();
var LoginServices = require('service/LoginServices.js');
var SSHServices = require('service/SSHService.js');
var config = require('config.json');
var sshServerConfig = config.sshServer;

app.post('/login',function(req, res, next){
    var userObj = {
        user : req.body.user,
        password : req.body.password 
    }
    LoginServices.isValidUser(userObj, function(er, rs){
        if(err){
            return res.send(err);
        }else{
            req.session.authenticated = true;
            req.session.user = rs
            return res.send(rs);
        }
    })    
});


app.use(function(req, res, next){
    if(req.session.authenticated){
        next();    
    }else{
        res.send({message : 'user should login.'})
    }
})

app.post('/command', function(req, res, next){
    var commandObj = {};
    var body = req.body;
    var sessionObj = req.session;
    commandObj.command = body.command;
    commandObj.host = sshServerConfig.host;
    commandObj.user = sessionObj.user.user;
    commandObj.filePath = sessionObj.user.filePath;
    SSHServices.connectAndExecute(commandObj, function(err, rs){
        if(err){
            return res.send(err);
        }else{
            res.send(rs);
        }
    });
})

module.exports = app;
