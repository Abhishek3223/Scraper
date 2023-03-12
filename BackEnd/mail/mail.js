"use strict";
const nodemailer = require("nodemailer");
// const mailTemplate = require('./mailtemplate')
const hbs = require('nodemailer-express-handlebars')
const path = require('path')
const viewpath = path.join(__dirname, "./views");

async function sendEmail(email, message) {

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
    console.log({
        user: process.env.user,
        pass: process.env.pass
    })
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
            // extname: '.hbs',
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
        template: 'email', // the name of the template file i.e email.handlebars
        context: {
            // replace {{name}} with Adebola
            Link: message // replace {{company}} with My Company
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

    // console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
// sendEmail('imabhishekranjan1100@gmail.com', 'loda.lassan')

module.exports = sendEmail