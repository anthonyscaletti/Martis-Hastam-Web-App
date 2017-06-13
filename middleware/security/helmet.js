const helmet = require('helmet');

module.exports = function(app){
    //Employ helmet module's security suite
    app.use(helmet());
};
