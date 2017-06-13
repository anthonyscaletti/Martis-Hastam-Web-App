const bodyParser = require('body-parser');

module.exports = function(app){
    return bodyParser.urlencoded({ extended: false });
};
