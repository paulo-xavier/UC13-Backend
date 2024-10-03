const bcrypt = require('bcrypt');
 
const password = "paul";
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
    if(err) throw err;

    console.log(`Encrpyted password: ${hash}`);
});


