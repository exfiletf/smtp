const express = require('express');
const bodyParser = require('body-parser');
const { sendEmail } = require('./sendmail'); // assuming the function is in emailSender.js

const app = express();
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { host, port, user, pass, to, subject, text, html } = req.body;

    try {
        await sendEmail({ host, port, user, pass, to, subject, text, html });
        res.status(200).send('Email sent successfully');
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
