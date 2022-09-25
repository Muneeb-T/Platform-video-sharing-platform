import nodemailer from 'nodemailer';
import { config } from 'dotenv';
config();

const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
    },
});

async function sendMail(messageDetails) {
    try {
        const { to, subject, text } = messageDetails;
        const mailOptions = {
            from: process.env.NODEMAILER_FROM_EMAIL,
            to,
            subject,
            text,
        };
        const mailInfo = await transporter.sendMail(mailOptions);
        console.log('\nConfirmation email has sent successfully');
        console.log('========================================');
        console.log(mailInfo);
    } catch (err) {
        console.log('\nNodemailer error');
        console.log('================');
        console.log(err);
    }
}

export { sendMail };
