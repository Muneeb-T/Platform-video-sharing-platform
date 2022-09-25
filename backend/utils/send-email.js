import nodemailer from 'nodemailer';

const mailTransporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
        user: 'muneebmnbth17@outlook.com',
        pass: 'MS79Q3hXwGc5cuc',
    },
});

const mailDetails = {
    from: 'muneebmnbth17@outlook.com',
    to: 'muneebmnb17@gmail.com',
    subject: 'Confirmantion main',
    text: 'Node.js testing mail for GeeksforGeeks',
};

const sendMail = async function () {
    mailTransporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log(err)
            console.log('Error Occurs');
        } else {
            console.log('Email sent successfully');
        }
    });
};

export { sendMail };
