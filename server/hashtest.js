var passhash = require('./passhash');

let salt = passhash.random(20);
let hash1 = passhash.sha512("polse",salt);
console.log(hash1.passwordHash);
console.log(hash1.salt);
let hash2 = passhash.sha512("pølse",salt);
console.log(hash2.passwordHash,hash2.salt);