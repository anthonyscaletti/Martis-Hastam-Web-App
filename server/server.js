const https = require('https');
const fs = require('fs');

module.exports = function(app, port){
    //Get certificate data
    var options = {
       key  : fs.readFileSync('./server/server.key'),
       cert : fs.readFileSync('./server/server.crt')
    };
    //Run server
    https.createServer(options, app).listen(port, function(){
        console.log("Server is listening at port " + port + "...");
    });
};
