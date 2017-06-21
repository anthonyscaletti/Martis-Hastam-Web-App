//Passes user data to crypto engine
const execFile = require('child_process').execFile;
const fs = require('fs');

//Encrypt file
const encrypt = function(file, sessID, callback){
    const child = execFile("./ENGINE/AESencrypt", ["./DATA/DATA-ENC/" + file, "./DATA/DATA-ENC/" + sessID + "keys.txt", "./DATA/DATA-ENC/" + sessID + "enc.txt"],function(err, stdout, stderr){
        if(err)
        {
            callback(stderr);
            fs.unlink("./DATA/DATA-ENC/" + sessID + "keys.txt", unlinkCallback);
            fs.unlink("./DATA/DATA-ENC/" + sessID + "enc.txt", unlinkCallback);
        }
        else
        {
            callback(stdout);
        }
    });
};
//Decrypt files
const decrypt = function(file1, file2, sessID, callback){
    const child = execFile("./ENGINE/AESdecrypt", ["./DATA/DATA-DEC/" + file1, "./DATA/DATA-DEC/" + file2, "./DATA/DATA-DEC/" + sessID + "dec"],function(err, stdout, stderr){
        if(err)
        {
            callback(stderr);
            fs.unlink("./DATA/DATA-DEC/" + file1, unlinkCallback);
            fs.unlink("./DATA/DATA-DEC/" + file2, unlinkCallback);
            fs.unlink("./DATA/DATA-DEC/" + sessID + "dec", unlinkCallback);
        }
        else
        {
            callback(stdout);
        }
    });
    //File unlink callback
    var unlinkCallback = function(err)
    {
        if(err)
        {
            console.log(err);
        }
    };
};
//Export module
module.exports = {encrypt, decrypt};
