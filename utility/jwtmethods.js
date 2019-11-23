var jwt = require('jsonwebtoken');

module.exports = {
    createToken: function (user) { // algorithm: 'RS256',  { algorithms: 'RS256'},
        var jwtToken = jwt
            .sign(user,'MySecRetKEY1998DE00P1299', {expiresIn: '3600s' });
        return jwtToken;
    },
    verifyToken: function (token) {
        return new Promise(function (resolve, reject) {
            jwt
                .verify(token, 'MySecRetKEY1998DE00P1299', function (err, decoded) {
                    if (err) {
                        return reject(err);
                    }
                    else {
                        return resolve(decoded);
                    }
                })
        });
    }
}