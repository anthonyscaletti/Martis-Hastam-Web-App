const bodyParser = require('../middleware/bodyParser');

module.exports = function(app){
    //Middleware body parser
    //const urlEncodedParser = bodyParser.urlencoded({ extended: false });
    const urlEncodedParser = bodyParser(app);
    //Route to Homepage
    app.get("/", function(req, res){
        res.render("index");
    });
    //Route to Homepage
    app.get("/home", function(req, res){
        res.render("index");
    });
    // Handle 404
    app.use(function(req, res, next){
      res.status(404).send("404 Page Not Found");
      next();
    });
};
