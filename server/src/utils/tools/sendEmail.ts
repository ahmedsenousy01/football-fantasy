import nodemailer from "nodemailer";
import config from "@/core/config";

export async function sendVerificationEmail(
    receiverEmail: string,
    subject: string,
    code: string
) {
    const transporter = nodemailer.createTransport({
        host: config.emails.host,
        port: config.emails.port,
        secure: config.emails.secure,
        auth: {
            user: config.emails.auth.user,
            pass: config.emails.auth.pass,
        },
    });

    await transporter.sendMail({
        from: config.emails.sender,
        to: receiverEmail,
        subject,
        html: code,
    });
}
