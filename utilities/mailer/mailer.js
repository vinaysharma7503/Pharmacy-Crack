const nodemailer = require('nodemailer');
const env = require('../../environment/env')

const transpoter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    requireTLS: true,
    service: 'gmail',
    auth: {
        user: env.EMAIL_USER,
        pass: env.EMAIL_PASS
    }
});

exports.sendEmail = (email_address, emailSubject, resetCode, username)=> {

    var mailOptions = {
        from: env.EMAIL_USER,
        to: email_address,
        subject: emailSubject,
        // text: 'That was easy!'
        html: HTMLMailFormat(username,resetCode)
    };
    //console.log(transporter);
    transpoter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent Sucessfully');
        }
    });
}

function HTMLMailFormat(username, resetCode ){
    let year = new Date();
    let logo = env.BUCKET_URL+env.EMAIL_LOGO_URL;
    let thumb = env.BUCKET_URL+env.EMAIL_THUMB_URL;
    return (`<div style='margin: 0; padding: 0; min-height: 100%; width: 100%'>
    <table align="center" style="background-image: linear-gradient(to right, #FAF0AA , #FAE024); width:100%; padding: 5x;">
        <thead>
            <th><img src="https://pharma-env-dev.s3.us-east-2.amazonaws.com/app_related_images/logo.svg" alt="logo" height="55px"> <span style="color: #FF48AC; font-size: 40px; vertical-align: top;">Pharmacy Crack</span> </th>
        </thead>
    </table>
    <table align="center" style="width:100%;">
        <tbody>
            <tr><td style="padding-top: 35px; padding-bottom: 10px;"><img src="https://pharma-env-dev.s3.us-east-2.amazonaws.com/app_related_images/thumbs_up.svg" alt="thumbsup"height="80px" style="display: block;margin-left: auto;margin-right: auto;width: 40%;"></td></tr>
            <tr><td style="text-align: center; font-weight: bold; font-size: large; padding-top: 20px;">Hi ${username}</td></tr>
            <tr><td style="text-align: center; font-weight: bold; font-size: large; padding-top: 20px;">Here is confirmation code for email verification</td></tr>
            <tr><td style="text-align: center; font-weight: bold; font-size: 60px; padding-top: 30px;">${resetCode}</td></tr>
            <tr><td style="text-align: center; font-weight: bold; font-size: large; padding-top: 20px;">Please use the above code for verification and reset your password</td></tr>
        </tbody>
    </table>
</div>
<div>
    <table align="center" style="width:100%;">
        <tbody>
            <tr><td style="text-align: center; padding-top: 30px;">For help with any of our services, please email our customer support:</td></tr>
            <tr><td style="text-align: center; padding-top: 10px;"><a href="mailto:support@pharmacycrack.com">support@pharmacycrack.com</a></td></tr>
            <tr><td style="text-align: center; padding-top: 10px;"><hr></td></tr>
            <tr><td style="text-align: center; padding-top: 10px;">&copy;${year.getFullYear()}, Pharmacy Crack Team. All rights reserved.</td></tr>
        </tbody>
    </table>
</div>`)
 }