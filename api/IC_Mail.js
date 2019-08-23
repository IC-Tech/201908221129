/*C:\Users\Imesh\Documents\Temp\Projects\201906021623\index.js*/
/* 
 Use the nodemailer@4.7.0
 new version still have bugs
*/
const nodemailer = require('nodemailer');
const IC_Mail = {
    Send: (to, subject, html) => {
        console.log('Sending Mail to => ' + to)
        return new Promise((res, rej) => {
            nodemailer.createTransport({
                host: 'smtp.mail.yahoo.com',
                port: 587,
                secure: false,
                auth: {
                    user: 'ic_tech.imeshchamara@yahoo.com',
                    pass: process.env.EMAIL_ACCOUNT_KEY
                },
                tls:{
                    ciphers:'SSLv3'
                }
            })
            .sendMail({
                from: '"IC-Tech" <ic_tech.imeshchamara@yahoo.com>',
                to: to,
                subject: subject,
                html: html
            }, function (err, info) {
                if(err)
                    res({s: false, d: err})
                else
                    res({s: true, d: info})
            });
        });
    }
};
exports.IC_Mail = IC_Mail;
