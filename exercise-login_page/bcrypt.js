const bcrypt = require('bcrypt');
 
const password = "paul";
const saltRounds = 10;


bcrypt.hash(password, saltRounds, (err, hash) => {

    if(err) throw err;

    console.log(`Encrypted password: ${hash}`);

    bcrypt.compare('paul2', hash, (err, result) => {
        
        if(err) throw err;
        if(result) {
            console.log('Correct password!');
        } else {
            console.log('Invalid password!');
        }
    })



})

