import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import mongoose from 'mongoose';
import emailSchema from '../models/email/email.js';
config();

const transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
    },
});

async function sendEmail(messageDetails, recieverId) {
    try {
        const { to, subject, text, html } = messageDetails;
        const mailOptions = {
            from: process.env.NODEMAILER_FROM_EMAIL,
            to,
            subject,
            text,
            html,
        };
        const mailInfo = await transporter.sendMail(mailOptions);
        const { messageId, envelope, response } = mailInfo;
        await emailSchema.create({
            sentTo: recieverId,
            messageId,
            envelope,
            response,
        });
        console.log('\nEmail has sent successfully');
        console.log('=============================');
        console.log(mailInfo);
    } catch (err) {
        console.log('\nNodemailer error');
        console.log('================');
        console.log(err);
        throw new Error(err);
    }
}

export { sendEmail };
