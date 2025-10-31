const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const SECRET_KEY = 'mysecretkey';

// Login route to generate token
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'testuser' && password === 'password123') {
        const token = jwt.sign({ id: 1, username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Middleware to verify token
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return res.status(401).json({ message: 'Token missing' });

    const token = authHeader.split(' ')[1];
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
}

// Protected route
app.get('/protected', verifyToken, (req, res) => {
    res.json({
        message: 'You have accessed a protected route!',
        user: req.user
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
