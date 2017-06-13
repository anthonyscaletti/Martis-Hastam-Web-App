const http = require('http');

module.exports = function(app, port){
    //Run server
    http.createServer(app).listen(port, function(){
        console.log("Server is listening at port " + port + "...");
    });
};

//REVERT BACK TO HTTPS AFTER TESTING
