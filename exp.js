const nodemailer = require('nodemailer');

function sendEmail({ host, port, user, pass, to, subject, text, html }) {
    const transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: false, // Set to true if using port 465, otherwise false for other ports like 587
        auth: {
            user: user,
            pass: pass,
        },
        tls: {
            rejectUnauthorized: false // Set to false if you are using a self-signed certificate
        }
    });

    const mailOptions = {
        from: user, // Sender address
        to: to, // List of receivers
        subject: subject, // Subject line
        text: text, // Plain text body
        html: html, // HTML body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(`Error: ${error}`);
        }
        console.log(`Message sent: ${info.response}`);
    });
}

// Usage example
sendEmail({
    host: 'mail.oepforum.com',
    port: 587, // SMTP port
    user: 'test@oepforum.com',
    pass: 'ONL5GBW9LVCR',
    to: 'recipient@example.com',
    subject: 'Test Email via Custom SMTP Server',
    text: 'Hello world!',
    html: '<b>Hello world!</b>',
});
