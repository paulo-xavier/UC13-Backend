const express = require('express');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');

// app.use(cors({
//     origin: 'http://127.0.0.1:5500'
// }))

app.use(cors());


app.use(bodyParser.json());

const saltRounds = 10;




const db = mysql2.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_system"
});



app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // console.log(username);
    // console.log(password);

    db.query('SELECT * FROM users WHERE user_username = ?', [username], (err, results) => {
        
        if (err) throw err;
        
        if (results.length === 0) {
            return res.status(400).send('Invalid username or password');
        }


        const storedHash = results[0].user_password;
        
        console.log(storedHash)

        bcrypt.compare(password, storedHash, (err, isMatch) => {

            // console.log('aqui')

            if (err) throw err;

            if (isMatch) {
                console.log("Is matched");
                return res.status(201).send('Finished');
            
            } else {
                
                return res.status(400).send('Invalid password')
            }

        })

    })
})


app.post('/register', (req, res) => {

    const { name, email, username, password } = req.body;

    // db.query('INSERT INTO users (user_name, user_email, user_username, user_password) VALUES (?, ?, ?, ?)', [name, email, username, password], (err, result) => {
    //     if (err) throw err;
    //     res.sendStatus(201); 
    // });

    console.log(password);


    bcrypt.hash(password, saltRounds, (err, hash) => {

    if (err) throw err;

    db.query('INSERT INTO users (user_name, user_email, user_username, user_password) VALUES (?, ?, ?, ?)', [name, email, username, hash], (err, result) => {
        if (err) throw err;
        
        res.sendStatus(201);
    });


    });


});



app.get('/registers', (req, res) => {
    db.query('SELECT * FROM users', (error, results) => {
        if (error) {
            res.status(500).send('Erro ao obter usuários.');
            return;
        }
        res.json(results);
    });
});




app.put('/users/:id', (req, res) => {

    const { id } = req.params;
    const { username, password } = req.body;

    const sql = 'UPDATE users SET user_username = ?, user_password = ? WHERE user_id = ?';

    db.query(sql, [username, password, id], (error, results) => {
        if (error) {
            res.status(500).send('Updating using failed!!');
            return;
        }

        res.send('User successfully updated!!');

    })
})


app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const sql = 'DELETE FROM users WHERE user_id = ?';

    db.query(sql, [id], (error, results) => {

        if (error) {
            res.status(500).send('Deleting using failed!!');
            return;


        } else {
            res.send('User successfully deleted!');
        }

    })

})


app.listen(3000, () => {
    console.log('Server running on port 3000');
})