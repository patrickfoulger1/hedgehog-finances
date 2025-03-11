import nodemailer from "nodemailer";

// Initialise the nodemailer transporter:
const transporter = nodemailer.createTransport({
    host: 'smtp.mailersend.net', // using MailerSend as a service.
    port: 587,
    secure: false,
    auth: {
        user: process.env.MAILERSEND_USER,
        pass: process.env.MAILERSEND_PASS
    }
});

// Iterate through the users in messageData array and sends inididual email messages:
export default async function mailerFunction(messageData) {
    for (const user of messageData) { // Iterate through each user in messageData
        const info = await transporter.sendMail({
            from: process.env.MAILERSEND_USER, // Sender email address
            to: user.email, // Recipient email address from messageData
            subject: "HedgeHog Finances Notification", // Subject of the email
            text: user.message // Use the user's message as the email text
        });
    }
}
