const { body, query, check } = require('express-validator'); // express validator import
const db = require('../mysql_config/database.js'); // user_DataSchema import
const dbFun = require('../mysql_config/database_function');
const signupModel = require('../models/signup_model')
const { validUserName } = require('./customRegex')

exports.user_register = ((req, res) => {
    return [
        body('email_address', 'Email is required.').isEmail()
            .custom(async (result, { req }) => {
                const response = await signupModel.findUserByEmail(result);// []
                if (response.length > 0) {  // true  // null undefiend false
                    req.errorStatus = 409; // 409 Unprocessable Entity
                    throw new Error('This email is already registered.');
                } else {
                    return true
                }
            }),
        body('username', 'Username is required.')
            .matches('[0-9]').withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .matches(/(?=.[!@#$_%^&])/).withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .matches('[A-Z]').withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .matches('[a-z]').withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .custom(async (result, { req }) => {
                const response = await signupModel.findUserByUsername(result);

                if (response.length > 0) {
                    req.errorStatus = 409; // 409 Unprocessable Entity
                    throw new Error('This username is already taken.')
                } else {
                    return true
                }
            }),
        check('password', 'Password is required.').isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters.')
            .trim().escape()
    ];

});


exports.user_login = ((req, res) => {
    return [
        body('password', 'Password is required.').exists().custom((result, { req }) => {

            let pwd = req.body.password;
            if (!Boolean(pwd)) {
                req.errorStatus = 400;
                throw new Error('Password is required.')
            } else {
                return true
            }
        }),
        body('email_address', 'Email is required.').isEmail()
            .custom(async (result, { req }) => {
                const response = await signupModel.findUserByEmail(result);
                if (Boolean(response.length)) {
                    req.userData = response[0];
                    return true //to controler
                } else {
                    req.errorStatus = 400; // 400 Unprocessable Entity
                    throw new Error('The above email address does not exist in our system.')

                }
            }),
    ]
});

exports.SocialRegister = ((req, res) => {
    return [
        body('email_address', 'Email is required.').isEmail()
            .custom(async (result, { req }) => {
                const response = await signupModel.findUserByEmail(result);// []
                if (response.length > 0) {  // true  // null undefiend false
                    req.errorStatus = 409; // 409 Unprocessable Entity
                    throw new Error('This email is already registered.');
                } else {
                    return true
                }
            }),
        body('username', 'Username is required.')
            .matches('[0-9]').withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .matches(/(?=.[!@#$_%^&])/).withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .matches('[A-Z]').withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .matches('[a-z]').withMessage('Username must contain at least 1 Number, Special Character, Lowercase, and Uppercase Letter.')
            .custom(async (result, { req }) => {
                const response = await signupModel.findUserByUsername(result);

                if (response.length > 0) {
                    req.errorStatus = 409; // 409 Unprocessable Entity
                    throw new Error('This username is already taken.')
                } else {
                    return true
                }
            })

    ]
})

exports.SocialLogin = ((req, res) => {
    return [
        body('email_address', 'Email is required.').isEmail()
            .custom(async (result, { req }) => {
                const response = await signupModel.findUserByEmail(result);
                if (Boolean(response.length)) {
                    req.userData = response[0];
                    return true //to controler
                } else {
                    req.errorStatus = 400; // 400 Unprocessable Entity
                    throw new Error(`This email address doesn't exist. Please register yourself first`)

                }
            }),
        check('credential_id', 'credential_id is Required').exists()
    ]
})

exports.forgotpasswordsmail = ((req, res) => {
    return [
        check('email_address', 'Email is required.').isEmail()
            .custom(async (result, { req }) => {
                const response = await signupModel.findUserByEmail(result); // []
                console.log(">>>>>>", response);
                if (Boolean(response.length)) {  // true  // null undefiend false
                    req.userData = response[0]
                    return true
                } else {
                    req.errorStatus = 400; // 400 Unprocessable Entity
                    throw new Error('The above email address does not exist in our system.');
                }

            })
    ]
})

exports.forgotpasswordscode = ((req, res) => {
    return [
        check('email_address', 'Email is required.').isEmail()
            .custom(async (result, { req }) => {
                const response = await signupModel.findUserByEmail(result); // []
                console.log(">>>>>>", response);
                if (Boolean(response.length)) {  // true  // null undefiend false
                    req.userData = response[0]
                    return true
                } else {
                    req.errorStatus = 400; // 400 Unprocessable Entity
                    throw new Error('The above email address does not exist in our system.');
                }

            })
    ]
})

exports.newpassword = ((req, res) => {
    return [
        check('password', 'Password is required.').isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters.')
            .trim().escape(),
        check('email_address', 'Email is required.').isEmail()
            .custom(async (result, { req }) => {
                const response = await signupModel.findUserByEmail(result); // []
                console.log(">>>>>>", response);
                if (Boolean(response.length)) {  // true  // null undefiend false
                    // req.dbdata = response[0]
                    return true
                } else {
                    req.errorStatus = 400; // 400 Unprocessable Entity
                    throw new Error('The above email address does not exist in our system.');
                }

            })
    ]
})

exports.set_newUsername = ((req, res) => {
    return [
        body('new_username')
            .custom(async (userName, { req }) => {

                if (Boolean(userName)) {
                    validUserName.forEach(item => {
                        if (!Boolean(userName.match(item.regex))) {
                            req.errorStatus = 400;
                            throw new Error(item.msg);
                        }
                    });

                    const isUserExist = await signupModel.findUserByUsername(userName);

                    if (Boolean(isUserExist.length)) {
                        req.errorStatus = 409; // 409 Unprocessable Entity
                        throw new Error('This username is already taken.')
                    } else {
                        return true;
                    }
                }
            })
    ];
});



