const express = require('express');
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const authenticate = require("./auth.js");

require("dotenv").config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {   
    res.send("Hello home");
});

app.get('/login/:username', (req, res) => {
    // Check user credentials (replace 1 with your authentication logic)
    if(1)
    {
        var data = { usename:req.params.username, datetime: new Date() }

        const token = jwt.sign(data, process.env.KEY, { expiresIn: '1h' })
        res.cookie('myCookie', token, { maxAge: 900000, httpOnly: true });

        res.send('Login successful');
    }
    else
        res.status(401).send('Invalid username or password');
});

app.get('/protected', authenticate, (req, res) => {
    res.send('This is a protected route : hello '+req.username);
});

app.get('/logout', (req, res) => {
    res.clearCookie('myCookie');
    res.send('Logged out successfully');
});



app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
