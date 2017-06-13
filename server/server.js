const https = require('https');

module.exports = function(app, port){
    //Run server
    https.createServer(app).listen(port, function(){
        console.log("Server is listening at port " + port + "...");
    });
};
