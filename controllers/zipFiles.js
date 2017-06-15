const fs = require("fs");
const zip = require("node-native-zip");

//Encrypted files
const zipEncFiles = function(file1, file2, sessID, callback){
    const archive = new zip();

    archive.addFiles([{name: file1, path:  "./DATA/DATA-ENC/" + file1}, {name: file2, path: "./DATA/DATA-ENC/" + file2}], function(err){
        if (err)
        {
            return console.error("err while adding files", err);
        }
        else
        {
            var buff = archive.toBuffer();

            fs.writeFile("./DATA/DATA-ENC/" + sessID + "ENCRYPTED.zip", buff, function(){
                callback();
            });
        }
    });
};
//Decrypted file
const zipDecFiles = function(file1, sessID, callback){
    const archive = new zip();

    archive.addFiles([{name: file1, path:  "./DATA/DATA-DEC/" + file1}], function(err){
        if (err)
        {
            return console.error("err while adding files", err);
        }
        else
        {
            var buff = archive.toBuffer();

            fs.writeFile("./DATA/DATA-DEC/" + sessID + "DECRYPTED.zip", buff, function(){
                callback();
            });
        }
    });
};
//Export module
module.exports = {zipEncFiles, zipDecFiles};
