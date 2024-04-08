import nodemailer from "nodemailer";
import nmExpHandlebars from "nodemailer-express-handlebars";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'riz.dev666@gmail.com',
        pass: 'mfmy znkv tjfk pmjl'
    }
});

transporter.use("compile", nmExpHandlebars({
    viewPath: "src/_emailTemplates/",
    extName: ".html",
    viewEngine: {
        extname: ".html",
        layoutsDir: "src/_emailTemplates/",
        defaultLayout: false,
        partialsDir: "src/_emailTemplates/"
    },
}));

export const sendEmail = async (emailReceipient: string, subject: string, text: string, template: string, context: {}) => {
    const mailOptions = {
        from: 'RizDev <no-reply@rizdev.com>',
        to: emailReceipient,
        subject: subject,
        text,
        template,
        context
    };

    return new Promise(async (resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) reject(error);
            else resolve(info);
        });
    });
};