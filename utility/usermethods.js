const encryption = require('./encryption');

const UserSplitOperator = "__";

module.exports = {
    createPassKey: function (user) { 
       var string =  user.id + UserSplitOperator + user.username ;
        return encryption.Encrypt(string);
    },
    verifyPassKey: function (passkey,user) {
        var string =  user.id + UserSplitOperator + user.username ;
        return (encryption.Decrypt(passkey) == string);
    }
}