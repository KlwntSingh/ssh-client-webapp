var session = require('express-session');
var body = require('body-parser');

module.exports = function(app){

    app.use(body());

    app.use(session({
      secret: 'keyboardcat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false, maxAge : 60000 }
    }))

}
