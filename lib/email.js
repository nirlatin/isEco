var nodemailer = require('nodemailer');
var constants = require('../config/constants');

exports.send = function (email, text, next) {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: "xxx@gmail.com",
            pass: "xxx"
        }
    });

    var mailOptions = {
        from: 'isEco',
        to: email,
        subject: 'Email Example',
        html: text
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            next();
        } else {
            next();
        }
        ;
    });

};
