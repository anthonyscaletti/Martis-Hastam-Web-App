const enforceSSL = require('express-enforces-ssl');

module.exports = function(app){
    //Always demand an https connection
    app.enable('trust proxy');
    app.use(enforceSSL());
};
