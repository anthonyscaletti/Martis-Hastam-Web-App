const bodyParser = require('../middleware/bodyParser');
const upload = require('express-fileupload');
const executeEngine = require('./executeEngine');
const compress = require('./zipFiles');
const execFile = require('child_process').execFile;
const fs = require('fs');

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
                    executeEngine.encrypt(ptext.name, req.sessionID, function(stdout){
                        if(stdout.trim() == "Encryption Successful")
                        {
                            //Compress files
                            compress.zipEncFiles(req.sessionID + "enc.txt", req.sessionID + "keys.txt", req.sessionID, function(){
                                fs.unlink("./DATA/DATA-ENC/" + ptext.name, callback);
                                fs.unlink("./DATA/DATA-ENC/" + req.sessionID + "keys.txt", callback);
                                fs.unlink("./DATA/DATA-ENC/" + req.sessionID + "enc.txt", callback);
                                res.render("submit-encryption", {status: "FILE ENCRYPTED SUCCESSFULLY", zipName: req.sessionID + "ENCRYPTED.zip"});
                                //Delete zip after 30s
                                setTimeout(function(){
                                    fs.unlink("./DATA/DATA-ENC/" + req.sessionID + "ENCRYPTED.zip", callback);
                                }, 35000);
                            });
                        }
                        else
                        {
                            res.render("submit-encryption", {status: "ERROR OCCURED", zipName: ""});
                        }
                    });
                }

            });
        }
    });
    //route to DownloadENC page
    app.post("/downloadENC", urlEncodedParser, function(req, res){
        //Get the session ID
        var sessID = req.body.fileName.substr(0, req.body.fileName.length - 13);
        //Download zipfile
        res.download("./DATA/DATA-ENC/" + req.body.fileName, function(){
            fs.unlink("./DATA/DATA-ENC/" + sessID + "ENCRYPTED.zip", callback);
        });
    });
    //route to Submit-decryption page
    app.post("/submit-decryption", urlEncodedParser,function(req, res){
        if(req.files)
        {
            var ctext = req.files.f1;
            var keys = req.files.f2;
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
                            //Execute crypto
                            executeEngine.decrypt(ctext.name, keys.name, req.sessionID, function(stdout){
                                if(stdout.trim() == "Decryption Successful")
                                {
                                    //Compress file
                                    compress.zipDecFiles(req.sessionID + "dec", req.sessionID, function(){
                                        fs.unlink("./DATA/DATA-DEC/" + ctext.name, callback);
                                        fs.unlink("./DATA/DATA-DEC/" + keys.name, callback);
                                        fs.unlink("./DATA/DATA-DEC/" + req.sessionID + "dec", callback);
                                        res.render("submit-decryption", {status: "FILE DECRYPTED SUCCESSFULLY", zipName: req.sessionID + "DECRYPTED.zip"});
                                        //Delete zip after 30s
                                        setTimeout(function(){
                                            fs.unlink("./DATA/DATA-DEC/" + req.sessionID + "DECRYPTED.zip", callback);
                                        }, 35000);
                                    });
                                }
                                else
                                {
                                    //I will not display other errors for security reasons
                                    res.render("submit-decryption", {status: "Hash Verification Error", zipName: ""});
                                }
                            });
                        }
                    });
                }
            });
        }
    });
    //route to DownloadDEC page
    app.post("/downloadDEC", urlEncodedParser, function(req, res){
        //Get the session ID
        var sessID = req.body.fileName.substr(0, req.body.fileName.length - 13);
        //Download zipfile
        res.download("./DATA/DATA-DEC/" + req.body.fileName, function(){
            fs.unlink("./DATA/DATA-DEC/" + sessID + "DECRYPTED.zip", callback);
        });
    });
    // Handle 404
    app.use(function(req, res, next){
      res.status(404).send("404 Page Not Found");
      next();
    });
    //File unlink callback
    var callback = function(err)
    {
        if(err)
        {
            console.log(err);
        }
    };
};
