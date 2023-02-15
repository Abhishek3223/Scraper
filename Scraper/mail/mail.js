"use strict";
const nodemailer = require("nodemailer");
// const mailTemplate = require('./mailtemplate')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const viewpath = path.join(__dirname, "./views");

async function sendEmail(email, price1, link1, price2, link2) {

    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });

    const handlebarOptions = {
        viewEngine: {
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: viewpath,
    };
    transporter.use('compile', hbs(handlebarOptions))

    const mailOptions = {
        from: 'scraptit007@gmail.com',
        to: email, 
        subject: "Target price reached ✔", 
        template: 'email',
        context: {
            price1: price1,
            link1: link1,
            price2: price2,
            link2: link2
        }
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            // do something useful
        }
    });
}
// sendEmail('imabhishekranjan1100@gmail.com', "", "", "", "")

module.exports = sendEmail