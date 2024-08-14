const { SMTPClient } = require('smtp-client');

async function sendEmail({ host, port, user, pass, to, subject, text, html }) {
    const client = new SMTPClient({
        host: host,
        port: port,
    });

    try {
        await client.connect();
        await client.greet({ hostname: 'localhost' }); // runs EHLO command
        await client.authPlain({ username: user, password: pass }); // authenticates a user
        await client.mail({ from: user }); // sender
        await client.rcpt({ to: to }); // recipient
        await client.data(); // starts data transmission
        await client.message(`Subject: ${subject}\nTo: ${to}\n\n${text || html}`); // message body
        await client.quit(); // closes the connection

        console.log('Email sent successfully');
    } catch (err) {
        console.error(`Error: ${err}`);
    }
}


/*
// Usage example
sendEmail({
    host: 'mail.oepforum.com',
    port: 587,
    user: 'test@oepforum.com',
    pass: 'ONL5GBW9LVCR',
    to: 'recipient@example.com',
    subject: 'Test Email',
    text: 'Hello world!',
    html: '<b>Hello world!</b>',
});
*/





