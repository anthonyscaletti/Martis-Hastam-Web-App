//Passes user data to crypto engine
const execFile = require('child_process').execFile;

//Encrypt file
const encrypt = function(file, sessID, callback){
    const child = execFile("./ENGINE/AESencrypt", ["./DATA/DATA-ENC/" + file, "./DATA/DATA-ENC/" + sessID + "keys.txt", "./DATA/DATA-ENC/" + sessID + "enc.txt"],function(err, stdout, stderr){
        if(err)
        {
            console.error(stderr);
            execFile("rm", ["./DATA/DATA-ENC/keys.txt", "./DATA/DATA-ENC/enc.txt"]);
        }
        else
        {
            console.log(stdout);
            callback();
        }
    });
};
//Decrypt files
const decrypt = function(file1, file2, ext, sessID, callback){
    const child = execFile("./ENGINE/AESdecrypt", ["./DATA/DATA-DEC/" + file1, "./DATA/DATA-DEC/" + file2, "./DATA/DATA-DEC/" + sessID + "dec." + ext],function(err, stdout, stderr){
        if(err)
        {
            console.error(stderr);
            execFile("rm", ["./DATA/DATA-DEC/dec.undefined"]);
        }
        else
        {
            console.log(stdout);
            callback();
        }
    });
};
//Export module
module.exports = {encrypt, decrypt};
