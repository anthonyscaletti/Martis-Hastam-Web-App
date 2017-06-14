const bodyParser = require('../middleware/bodyParser');
const upload = require('express-fileupload');
const executeEngine = require('./executeEngine');
const execFile = require('child_process').execFile;

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
            ptext.name = req.sessionID + ptext.name;
            //Move plaintext file to DATA-ENC
            ptext.mv("./DATA/DATA-ENC/" + ptext.name, function(err){
                if(err)
                {
                    console.log(err);
                    res.render("submit-encryption", {status: "ERROR OCCURED"});
                }
                else
                {
                    executeEngine.encrypt(ptext.name, req.sessionID, function(){
                        //res.render("submit-encryption", {status: "FILE ENCRYPTED SUCCESSFULLY"});
                        res.download("./DATA/DATA-ENC/" + req.sessionID + "enc.txt", req.sessionID + "enc.txt", function(){
                            //execFile("rm", ["./DATA/DATA-ENC/" + ptext.name, "./DATA/DATA-ENC/" + req.sessionID + "keys.txt", "./DATA/DATA-ENC/" + req.sessionID + "enc.txt"]);
                        });
                    });
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
            ctext.name = req.sessionID + ctext.name;
            keys.name = req.sessionID + keys.name;
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
                            executeEngine.decrypt(ctext.name, keys.name, ext, req.sessionID, function(){
                                //res.render("submit-decryption", {status: "FILE DECRYPTED SUCCESSFULLY"});
                                res.download("./DATA/DATA-DEC/" + req.sessionID + "dec." + ext, req.sessionID + "dec." + ext, function(){
                                    execFile("rm", ["./DATA/DATA-DEC/" + ctext.name, "./DATA/DATA-DEC/" + keys.name, "./DATA/DATA-DEC/" + req.sessionID + "dec." + ext]);
                                });
                            });
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
