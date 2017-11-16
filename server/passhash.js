'use strict'
let crypto = require('crypto');

var genRandomString = function(length){
    return crypto.randomBytes(Math.ceil(length/2))
            .toString('hex') /** convert to hexadecimal format */
            .slice(0,length);   /** return required number of characters */
};


let passhash = {
    random: (length)=>{
        return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex')
        .slice(0,length);
    },
    sha512: (password,salt)=>{
        var hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
        hash.update(password);
        var value = hash.digest('hex');
        return {
            salt:salt,
            passwordHash:value
        };
    },
    
}

module.exports = passhash;