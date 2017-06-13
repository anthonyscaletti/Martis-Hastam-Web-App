const bodyParser = require('../middleware/bodyParser');
const upload = require('express-fileupload');
const executeEngine = require('./executeEngine');

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
    //Route to Encryption page
    app.get("/encryption", function(req, res){
        res.render("encryption");
    });
    //Route to Decryption page
    app.get("/decryption", function(req, res){
        res.render("decryption");
    });
    //route to Submit-encryption page
    app.post("/submit-encryption", function(req, res){
        if(req.files)
        {
            var ptext = req.files.f1;
            console.log(ptext);
            //Move plaintext file to DATA-ENC
            ptext.mv("./DATA/DATA-ENC/" + ptext.name, function(err){
                if(err)
                {
                    console.log(err);
                    res.render("submit-encryption", {status: "ERROR OCCURED"});
                }
                else
                {
                    executeEngine.encrypt(ptext.name);
                    res.render("submit-encryption", {status: "FILE ENCRYPTED SUCCESSFULLY"});
                }

            });
        }
    });
    //route to Submit-decryption page
    app.post("/submit-decryption", urlEncodedParser,function(req, res){
        if(req.files)
        {
            var ctext = req.files.f1;
            var keys = req.files.f2;
            var ext = req.body.ext;
            //Move ciphertext file to DATA-DEC
            ctext.mv("./DATA/DATA-DEC/" + ctext.name, function(err){
                if(err)
                {
                    console.log(err);
                    res.render("submit-decryption", {status: "ERROR OCCURED"});
                }
                else
                {
                    //Move keys file to DATA-DEC
                    keys.mv("./DATA/DATA-DEC/" + keys.name, function(err){
                        if(err)
                        {
                            console.log(err);
                            res.render("submit-decryption", {status: "ERROR OCCURED"});
                        }
                        else
                        {
                            executeEngine.decrypt(ctext.name, keys.name, ext);
                            res.render("submit-decryption", {status: "FILE DECRYPTED SUCCESSFULLY"});
                        }
                    });
                }
            });
        }
    });
    // Handle 404
    app.use(function(req, res, next){
      res.status(404).send("404 Page Not Found");
      next();
    });
};
