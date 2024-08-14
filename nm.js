const nodemailer = require('nodemailer');

function sendEmail({ host, port, user, pass, to, subject, text, html }) {
    const transporter = nodemailer.createTransport({
        host: host,
        port: port,
        secure: false, // Use true for port 465, false for other ports like 587
        auth: {
            user: user,
            pass: pass,
        },
        tls: {
            rejectUnauthorized: false // Allow self-signed certificates
        }
    });

    const mailOptions = {
        from: user, // sender address
        to: to, // recipient
        subject: subject, // Subject line
        text: text, // Plain text body
        html: html, // HTML body
    };

    return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
