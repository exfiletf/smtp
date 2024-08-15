const OJParty = require('ojparty');
const sendEmail = require('./nm');

const app = OJParty.ojparty.app();

app.post('/smtp', async (req, res) => {
    const { to, subject, text, html } = req.body;

    try {
        await sendEmail({
            host: 'smtp.gmail.com',
            port: 25, // SMTP port
            user: 'exfiletf@gmail.com',
            pass: 'aycy upkd daqt kdde',
            to:to,
            subject: subject || 'Default Subject',
            text: text || 'Hello world!',
            html: html || '<b>Hello world!</b>',
        });
        res.send('Email sent successfully');
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
});

app.listen(3090);
