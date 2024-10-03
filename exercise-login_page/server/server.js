const express = require('express'); 
const bodyParser = require('body-parser');
const mysql2 = require('mysql2');
const app = express(); 
const cors = require('cors');

app.use(cors({
    origin: 'http://127.0.0.1:5500'
}))


app.use(bodyParser.json()); 


const db = mysql2.createConnection({
    host: "localhost", 
    user: "root", 
    password: "", 
    database: "login_system"
}); 



app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE user_name = ? AND user_password = ?', [username, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.sendStatus(200); 
        } else {
            res.status(401).send('Well succed');
        }

    })
})


app.post('/register', (req, res) => {

    const { name, email, username, password} = req.body;

        db.query('INSERT INTO users (user_name, user_email, user_username, user_password) VALUES (?, ?, ?, ?)', [name, email, username, password], (err, result) => {
            if (err) throw err;
            res.sendStatus(201); // Usuário registrado com sucesso
        });
    });

    




app.listen(3000, () => {
    console.log('Server running on port 3000');
})