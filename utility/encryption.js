const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');


module.exports = {
    Encrypt: function (data) { 
        const encryptedString = cryptr.encrypt(data);
        return encryptedString;
    },
    Decrypt: function (data) {
        const decryptedString = cryptr.decrypt(data);
        return decryptedString;
    }
}

