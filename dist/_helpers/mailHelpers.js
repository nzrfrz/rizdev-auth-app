"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_express_handlebars_1 = __importDefault(require("nodemailer-express-handlebars"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'riz.dev666@gmail.com',
        pass: 'mfmy znkv tjfk pmjl'
    }
});
transporter.use("compile", (0, nodemailer_express_handlebars_1.default)({
    viewPath: "src/_emailTemplates/",
    extName: ".html",
    viewEngine: {
        extname: ".html",
        layoutsDir: "src/_emailTemplates/",
        defaultLayout: false,
        partialsDir: "src/_emailTemplates/"
    },
}));
const sendEmail = (emailReceipient, subject, text, template, context) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: 'RizDev <no-reply@rizdev.com>',
        to: emailReceipient,
        subject: subject,
        text,
        template,
        context
    };
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error)
                reject(error);
            else
                resolve(info);
        });
    }));
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=mailHelpers.js.map