const userSignUpModel = require('../models/signup_model');
const userSocialModel = require('../models/social_model');
const bcrypt = require('bcryptjs');
const nodeMailer = require('../utilities/mailer/mailer');
const jwt = require('jsonwebtoken');
const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const env = require('../environment/env');
const fs = require('fs')

exports.signup = async (req, res, next) => {
    try {
        const data = req.body
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const full_name = data.full_name;
        const email_address = data.email_address;
        const password = hashedPassword;
        const username = data.username;
        const dob = data.dob;
        const country = data.country;
        const state = data.state;
        const clasification_id = data.clasification_id;
        const speciality_id = data.speciality_id;
        const college = data.college;


        await userSignUpModel.userRegistration(full_name, email_address, password, username, dob, country, state, clasification_id, speciality_id, college)
            .then(async (doc) => {
                
                await userSignUpModel.findUserByEmail(email_address).then((result) => {
                    const userData = Boolean(result.length) ? result[0] : {}
                    jwt.sign({ email_address: userData.email_address, password: userData.password, id: userData.id}, env.jwt_secret, async (err, token) => {
                        if (err) {
                            next(err)
                        }
                        var user_Details = {
                            "user_data": { fullname: userData.full_name, email_address: userData.email_address, profile_pic: userData.profile_pic, username: userData.username, dob: userData.dob, country: userData.country, state: userData.state, clasification_id: userData.clasification_id, speciality_id: userData.speciality_id, college: userData.college },
                            "auth_token": token
                        }
                        res.status(200).json({ message: 'User registered successfully.', user_Details });
                    });
                })
            });


    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err });
        } else {
            res.status(500).send(err);
        }
    }

}


exports.login = async (req, res, next) => {
    try {
        const userData = req.userData //database
        const password = userData.password;
        const isMatched = await bcrypt.compare(req.body.password, password);
        if (isMatched) {
            jwt.sign({ email_address: userData.email_address, password: userData.password, id: userData.id}, env.jwt_secret, (error, token) => {
                if (error) {
                    next(error)
                }
                var user_Details = {
                    "user_data": { fullname: userData.full_name, email_address: userData.email_address, profile_pic: userData.profile_pic, username: userData.username, dob: userData.dob, country: userData.country, state: userData.state, clasification_id: userData.clasification_id, speciality_id: userData.speciality_id, college: userData.college },
                    "auth_token": token
                }
                res.status(200).json({ message: "User logged in successfully.", user_Details });
            })
        } else {
            res.status(401).json({ message: "Invalid email or password." });
        }
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        } else {
            res.status(500).send(err);
        }
    }

}

exports.forgotpassword = async (req, res) => {
    try {
        const userData = req.userData //database
        const email_address = req.body.email_address;
        const username = userData.username;
        const resetCode = Math.floor(100000 + Math.random() * 900000);
        await userSignUpModel.updateUserPasswordcodemail(email_address, resetCode, username)
        nodeMailer.sendEmail(email_address, 'Pharmacy Crack - Password Reset Request', resetCode, username);
        res.status(200).send({ message: 'Reset code sent to your registered email.' });

    } catch (err) {
        console.log(err)
        if (err) {
            return res.status(400).send({ 'message': err.message });

        } else {
            res.status(500).send(err);
        }


    }
}


exports.resetcode = (req, res) => {
    try {
        const userData = req.userData //database
        const reset_password_code = userData.reset_password_code;
        if (req.body.resetCode == reset_password_code) {
            res.status(200).json({
                message: "Reset code matched successfully."
            });
        } else {
            res.status(400).json({
                message: "Please enter valid reset code."
            });
        }

    } catch (err) {
        console.log(err)
        if (err) {

            return res.status(400).send({ 'message': err.message });

        } else {
            res.status(500).send(err);
        }


    }
}

exports.newpassword = async (req, res) => {
    try {
        const data = req.body
        const email_address = data.email_address;
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const password = hashedPassword;
        await userSignUpModel.updateUserPassword(email_address, password)
        res.status(200).json({
            message: "Password updated successfully."
        });

    } catch (err) {
        console.log(err)
        if (err) {

            return res.status(400).send({ 'message': err.message });

        } else {
            res.status(500).send(err);
        }


    }
}

exports.SocialLogin = async (req, res) => {

    try {
        const data = req.body;
        const email_address = data.email_address;
        const credential_id = data.credential_id;
        const social_type = data.social_type;

        const response = await userSignUpModel.findUserByEmail(email_address);
        if (Boolean(response.length)) {
            const userData = response[0];
            const user_id = userData.id;
            const social = await userSocialModel.findUserByUserId(user_id);
            const userSocialData = social;
            if (!Boolean(social.length)) {
                await userSocialModel.SocialModel(user_id, credential_id, social_type);
                jwt.sign({ email_address: userData.email_address, password: userData.password, id: userData.id}, env.jwt_secret, (error, token) => {
                    if (error) {
                        next(error)
                    }
                    var user_Details = {
                        "user_data": { fullname: userData.full_name, email_address: userData.email_address, profile_pic: userData.profile_pic, username: userData.username, dob: userData.dob, country: userData.country, state: userData.state, clasification_id: userData.clasification_id, speciality_id: userData.speciality_id, college: userData.college, credential_id: userSocialData.credential_id, social_type: userSocialData.social_type },
                        "auth_token": token
                    }
                    res.status(200).json({ message: "User logged in successfully.", user_Details });
                })
            } else if (Boolean(userSocialData.find((obj) => obj.credential_id == credential_id)) &&
                Boolean(userSocialData.find((obj) => obj.social_type == social_type))) {
                jwt.sign({ email_address: userData.email_address, password: userData.password, id: userData.id}, env.jwt_secret, async (error, token) => {
                    if (error) {
                        next(error)
                    }
                    const foundSocial = await userSocialModel.findUserByUserIdNSocialType(user_id, social_type);

                    const user_Details = {
                        "user_data": { fullname: userData.full_name, email_address: userData.email_address, profile_pic: userData.profile_pic, username: userData.username, dob: userData.dob, country: userData.country, state: userData.state, clasification_id: userData.clasification_id, speciality_id: userData.speciality_id, college: userData.college, credential_id: foundSocial[0].credential_id, social_type: foundSocial[0].social_type },
                        "auth_token": token
                    }

                    res.status(200).json({ message: "User logged in successfully.", user_Details });
                })
            } else if (!Boolean(userSocialData.find((obj) => obj.credential_id == credential_id)) &&
                !Boolean(userSocialData.find((obj) => obj.social_type == social_type))) {

                await userSocialModel.SocialModel(user_id, credential_id, social_type);
                jwt.sign({ email_address: userData.email_address, password: userData.password, id: userData.id }, env.jwt_secret, async (error, token) => {
                    if (error) {
                        next(error)
                    }
                    const newSocial = await userSocialModel.findUserByUserIdNSocialType(user_id, social_type);

                    const user_Details = {
                        "user_data": { fullname: userData.full_name, email_address: userData.email_address, profile_pic: userData.profile_pic, username: userData.username, dob: userData.dob, country: userData.country, state: userData.state, clasification_id: userData.clasification_id, speciality_id: userData.speciality_id, college: userData.college, credential_id: newSocial[0].credential_id, social_type: newSocial[0].social_type },
                        "auth_token": token
                    }
                    res.status(200).json({ message: "User logged in successfully.", user_Details });
                })
            } else {
                res.status(401).json({ message: "You have entered invalid login credentials." });
            }

        } else {
            // SIMRAN - PLEASE RETURN ERROR MESSAGE -- PLEASE REGISTER
            return res.status(400).send({ message: 'Please Register' });
        }

    } catch (err) {
        console.log(err)
        if (err) {
            return res.status(400).send({ 'message': err.message });
        } else {
            res.status(500).send(err);
        }
    }
}


exports.SocialRegister = async (req, res) => {

    // SIMRAN - PLEASE DO ONLY SOCIAL REGISTER NOT LOGIN

    // ADD ALL PARAMS OF REGISTRATION AS WE HAVE IN NORMAL REGISTER + SOCIAL ID + SOCIAL TYPE


    try {
        const data = req.body;
        const full_name = data.full_name;
        const email_address = data.email_address;
        const username = data.username;
        const dob = data.dob;
        const country = data.country;
        const state = data.state;
        const clasification_id = data.clasification_id;
        const speciality_id = data.speciality_id;
        const college = data.college;
        const credential_id = data.credential_id;
        const social_type = data.social_type;

        const response = await userSignUpModel.findUserByEmail(email_address);



        if (social_type == 'F') {
            const password = await bcrypt.hash('@fb.com', 10);

            await userSocialModel.SocialRegisterModel(full_name, email_address, password, username, dob, country, state, clasification_id, speciality_id, college);

            const response = await userSignUpModel.findUserByEmail(email_address);
            const userData = response[0];
            const user_id = userData.id;

            await userSocialModel.SocialModel(user_id, credential_id, social_type);
        } else if (social_type == 'G') {
            const password = await bcrypt.hash('@gmail.com', 10);

            await userSocialModel.SocialRegisterModel(full_name, email_address, password, username, dob, country, state, clasification_id, speciality_id, college);

            const response = await userSignUpModel.findUserByEmail(email_address);
            const userData = response[0];
            const user_id = userData.id;

            await userSocialModel.SocialModel(user_id, credential_id, social_type);
        }
        else {
            const password = await bcrypt.hash('@apple.com', 10);

            await userSocialModel.SocialRegisterModel(full_name, email_address, password, username, dob, country, state, clasification_id, speciality_id, college);

            const response = await userSignUpModel.findUserByEmail(email_address);
            const userData = response[0];
            const user_id = userData.id;

            await userSocialModel.SocialModel(user_id, credential_id, social_type);
        }
        await userSignUpModel.findUserByEmail(email_address).then((result) => {
            
            const userData = Boolean(result.length) ? result[0] : {}
            jwt.sign({ email_address: userData.email_address, password: userData.password, id: userData.id }, env.jwt_secret, async (err, token) => {
                if (err) {
                    next(err)
                }
                
                const social = await userSocialModel.findUserByUserId(userData.id);
                const userSocialData = social[0];
                var user_Details = {
                    "user_data": { fullname: userData.full_name, email_address: userData.email_address, profile_pic: userData.profile_pic, username: userData.username, dob: userData.dob, country: userData.country, state: userData.state, clasification_id: userData.clasification_id, speciality_id: userData.speciality_id, college: userData.college, social_type: userSocialData.social_type },
                    "auth_token": token
                }
                res.status(200).json({ message: 'User register successfully.', user_Details })
            });
        })


    } catch (err) {
        console.log(err)
        if (err) {
            return res.status(400).send({ 'message': err.message });
        } else {
            res.status(500).send(err);
        }
    }
}

// exports.Profile = async (req, res) => {
//     try {
//         const s3 = new AWS.S3({
//             accessKeyId: env.AWS_ID,
//             secretAccessKey: env.AWS_SECRET,
//             region: "us-east-2"
//         })
//         let myFile = req.file.originalname.split('.')
//         const fileType = myFile[myFile.length - 1]
//         const imgName = `${uuidv4()}.${fileType}`
//         const params = {
//             Bucket: env.AWS_BUCKET_NAME,
//             Key: `profile_pic/${imgName}`,
//             Body: fs.createReadStream(req.file.path),
//             ContentDisposition: 'inline',
//             acl: "public-read"

//         }

//         s3.upload(params, async (err, data) => {
//             if (err) {
//                 return res.status(400).send({ 'message': err.message });
//             } else {
//                 const userData = req.userData;
//                 const id = userData.id;
//                 const profile_pic = env.PROFILE_PIC_BASEURL + imgName;
//                 await userSignUpModel.uploadPrfilePic(id, profile_pic)
//                 res.status(200).send({ message: "Profile Pic Upload Sucessfully", data });
//             }
//         })


//     } catch (err) {
//         console.log(err)
//         if (err) {
//             return res.status(400).send({ 'message': err.message });
//         } else {
//             res.status(500).send(err);
//         }
//     }
// }

// exports.setNewUserName = async (req, res) => {
//     try {
//         const data = req.body
//         const userData = req.userData;
//         const email_address = userData.email_address;
//         const new_username = data.new_username;
//         const userExists = await userSignUpModel.findUserByEmail(email_address);
//         const current_username = userData.username;
//         if (userExists[0].username == current_username) {
//             await userSignUpModel.setNewUserName(email_address, new_username)
//             res.status(200).json({ message: 'Username Update Successfully' });
//         } else {
//             res.status(401).json({ message: " Old Username Does not exists" });
//         }
//     } catch (err) {
//         console.log(err)
//         if (err) {
//             return res.status(400).send({ 'message': err.message });
//         } else {
//             res.status(500).send(err);
//         }
//     }
// }

exports.ChangeProfile = async (req, res) => {
    try {
        var responseStatus = true;
        const { id, email_address } = req.userData;
        if (req.file && req.file.fieldname === "profile_pic") {
            const s3 = new AWS.S3({
                accessKeyId: env.AWS_ID,
                secretAccessKey: env.AWS_SECRET,
                region: "us-east-2"
            })
            let myFile = req.file.originalname.split('.')
            const fileType = myFile[myFile.length - 1]
            const imgName = `${uuidv4()}.${fileType}`
            
            const params = {
                Bucket: env.AWS_BUCKET_NAME,
                Key: `profile_pic/${imgName}`,
                Body: fs.createReadStream(req.file.path),
                ContentDisposition: 'inline',
                acl: "public-read"
            }
            await s3.upload(params).promise();
            var profile_pic = env.PROFILE_PIC_BASEURL + imgName;
            await userSignUpModel.uploadPrfilePic(id, profile_pic)
        }
        if (req.body && req.body.new_username) {
            const { new_username } = req.body;
            await userSignUpModel.findUserByEmail(email_address);

            await userSignUpModel.setNewUserName(email_address, new_username)

        }
        if (responseStatus) {
            res.status(200).json({ message: `${req.file && req.body.new_username ? 'Profile' : req.file ? 'Profile Pic' : 'Username'} updated successfully.` ,profile_pic});
        }
    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        } else {
            res.status(500).send(err);
        }
    }
}

exports.deleteAccount = async (req, res) => {
    try {
        const userData = req.userData;
        const email_address = userData.email_address;
        await userSignUpModel.deleteUser(email_address);
        res.status(200).json({ message: 'User delete successfully.' });

    } catch (err) {
        if (err) {
            return res.status(400).send({ 'message': err.message });
        } else {
            res.status(500).send(err);
        }
    }


}

