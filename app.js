const express = require('express');
const router = require('./controllers/router');
const enforceSSL = require('./middleware/security/enforceSSL');
const helmet = require('./middleware/security/helmet');
const runServer = require('./server/server');
const cookieParser = require('cookie-parser');
const session = require('express-session');

//Initialize express object
const app = express();
//Initialize session
app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!", resave: false, saveUninitialized: false}));
//Enforce HTTPS connections
enforceSSL(app);
//Employ helmet module's security suite
helmet(app);
//Use EJS view engine
app.set("view engine", "ejs");
//Specify where the static files are located
app.use(express.static(__dirname + '/public'));
//Router engine
router(app);
//Run server
runServer(app, process.env.PORT || 5000);
