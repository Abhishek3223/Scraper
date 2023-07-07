"use strict";
const nodemailer = require("nodemailer");
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const viewpath = path.join(__dirname, "./views");

async function sendEmail(email, message) {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.user,
            pass: process.env.pass
        }
    });

    // point to the template folder
    const handlebarOptions = {
        viewEngine: {
            extname: '.hbs',
            partialsDir: path.resolve('./views/'),
            defaultLayout: false,
        },
        viewPath: viewpath,
    };
    transporter.use('compile', hbs(handlebarOptions))

    // send mail with defined transport object
    const mailOptions = {
        from: 'scraptit007@gmail.com',// sender address
        to: email, // list of receivers
        subject: "Email verification ✔", // Subject line
        template: 'email',
        context: {
            Link: message 
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
// sendEmail('imabhishekranjan1100@gmail.com', 'loda.lassan')

module.exports = sendEmail