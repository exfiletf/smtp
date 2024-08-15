const OJParty = require('ojparty');
const sendEmail = require('./nm');

const app = OJParty.ojparty.app();

app.post('/smtp', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    const { subject, text, html } = req.body;

    try {
        await sendEmail({
            host: 'smtp.gmail.com',
            port: 587, // SMTP port
            user: 'exfiletf@gmail.com',
            pass: 'aycy upkd daqt kdde',
            to:'exfiletf@gmail.com',
            subject: subject || 'Default Subject',
            text: text || 'Hello world!',
            html: html || '<b>Hello world!</b>',
        });
        res.setHeader('Access-Control-Allow-Origin','*')
        res.send('Email sent successfully');
    } catch (err) {
        res.setHeader('Access-Control-Allow-Origin','*')
        res.status(500).send(`Error: ${err.message}`);
    }
});

app.listen(3090);
