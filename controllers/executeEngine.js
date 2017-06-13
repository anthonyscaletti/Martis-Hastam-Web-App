//Passes user data to crypto engine
const execFile = require('child_process').execFile;

//Encrypt file
const encrypt = function(file){
    const child = execFile("../ENGINE/AESencrypt", ["../DATA/DATA-ENC/" + file, "../DATA/DATA-ENC/keys.txt", "../DATA/DATA-ENC/enc.txt"],function(err, stdout, stderr){
        if(err)
        {
            console.error(stderr);
            execFile("rm", ["../DATA/DATA-ENC/keys.txt", "../DATA/DATA-ENC/enc.txt"]);
        }
        else
        {
            console.log(stdout);
        }
    });
};
//Decrypt files
const decrypt = function(file1, file2){
    const child = execFile("../ENGINE/AESdecrypt", ["../DATA/DATA-DEC/" + file1, "../DATA/DATA-DEC/" + file2, "../DATA/DATA-DEC/dec.txt"],function(err, stdout, stderr){
        if(err)
        {
            console.error(stderr);
            execFile("rm", ["../DATA/DATA-DEC/dec.txt"]);
        }
        else
        {
            console.log(stdout);
        }
    });
};

module.exports = {encrypt, decrypt};
