const bodyParser = require('../middleware/bodyParser');
const upload = require('express-fileupload');

module.exports = function(app){
    //Middleware express-fileupload
    app.use(upload());
    //Middleware body parser
    const urlEncodedParser = bodyParser(app);
    //Route to Homepage
    app.get("/", function(req, res){
        res.render("index");
    });
    //Route to Homepage
    app.get("/home", function(req, res){
        res.render("index");
    });
    //route to Submit page
    app.post("/submit", function(req, res){
        if(req.files)
        {
            var ptext = req.files.f1;

            ptext.mv("./DATA/" + ptext.name, function(err){
                if(err)
                {
                    console.log(err);
                    res.send("ERROR OCCURED");
                }
                else
                    res.send("FILE RECEIVED");
            });
        }
    });
    // Handle 404
    app.use(function(req, res, next){
      res.status(404).send("404 Page Not Found");
      next();
    });
};
