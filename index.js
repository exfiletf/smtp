const OJParty = require('ojparty');
const sendEmail = require('./nm');

const app = OJParty.ojparty.app();

app.post('/smtp', async (req, res) => {
    const { subject, text, html } = req.body;

    try {
        await sendEmail({
            host: 'mail.oepforum.com',
            port: 587, // SMTP port
            user: 'test@oepforum.com',
            pass: 'FzYe5qJQWhCd',
            to: 'exfiletf@gmail.com',
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
