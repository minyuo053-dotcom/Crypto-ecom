const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Crypto payment routes
app.post('/api/payment', (req, res) => {
    const { amount, currency } = req.body;
    // Handle cryptocurrency payment logic here
    res.status(200).send({ message: 'Payment processed', amount, currency });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
