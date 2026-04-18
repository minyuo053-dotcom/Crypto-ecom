const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('your_mongodb_connection_string', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware to authenticate token
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Authentication routes
app.post('/auth/login', (req, res) => {
    // authenticate user and return a JWT token
    const username = req.body.username;
    // Implement your user authentication logic here
    const token = jwt.sign({ username }, 'your_jwt_secret');
    res.json({ token });
});

// Products routes
app.get('/products', authenticateToken, (req, res) => {
    // Fetch products from database
    res.json({ message: 'Fetched products successfully!' });
});

// Crypto payments routes
app.post('/pay/transak', authenticateToken, (req, res) => {
    // Logic for handling Transak payments
    res.json({ message: 'Payment processed via Transak!' });
});

app.post('/pay/mexc', authenticateToken, (req, res) => {
    // Logic for handling MEXC payments
    res.json({ message: 'Payment processed via MEXC!' });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});