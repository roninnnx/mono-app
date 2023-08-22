const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const secretKey = 'ensolvers';


const users = [
    { id: 1, username: 'ensolvers', password: 'ensolvers1' },
];

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    // autenticate
    const user = users.find(user => user.username === username && user.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });

    res.json({ token });
});

module.exports = router;
