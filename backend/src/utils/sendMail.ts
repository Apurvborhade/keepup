import nodemailer from 'nodemailer'

interface Options {
    to: string;
    subject: string;
    message: string;
}

export const sendEmail = async (options: Options) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.FromMail,
            pass: process.env.GOOGLE_APP_PASSWORD,
        },
    });
    const mailOptions = {
        from: process.env.FromMail,
        to: options.to,
        subject: options.subject,
        html: options.message,
    };

    await transporter.sendMail(mailOptions);
}