var app = require('express')();
var LoginServices = require('service/LoginServices.js');
var SSHServices = require('service/SSHService.js');
var config = require('config.json');
var sshServerConfig = config.sshServer;

app.post('/login',function(req, res, next){
    console.log("In login req received");
    var userObj = {
        user : req.body.user,
        password : req.body.password 
    }
    console.log(req.body);
    LoginServices.isValidUser(userObj, function(err, rs){
        if(err){
            return res.status(422).send(err);
        }else{
            req.session.authenticated = true;
            req.session.user = rs
            console.log(req.session);
            return res.send(rs);
        }
    })    
});


app.use(function(req, res, next){
    console.log(req.session);
    if(req.session.authenticated){
        next();    
    }else{
        res.send({message : 'user should login.'})
    }
})

app.post('/command', function(req, res, next){
    console.log("Command Execution Req");
    var commandObj = {};
    var body = req.body;
    var sessionObj = req.session;
    commandObj.command = body.command;
    commandObj.host = sshServerConfig.host;
    commandObj.port = sshServerConfig.port;
    commandObj.user = sessionObj.user.user;
    commandObj.filePath = sessionObj.user.filePath;
    console.log("Following Command will be executed" );
    console.log(body);
    SSHServices.connectAndExecute(commandObj, function(err, rs){
        if(err){
            console.log(err);
            return res.send(err);
        }else{
            res.send(rs);
        }
    });
})

module.exports = app;
