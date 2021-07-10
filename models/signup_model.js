const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');

const userSignUpModel = {
    userRegistration: userRegistration,
    findUserByEmail: findUserByEmail,
    findUserByUsername: findUserByUsername,
    updateUserPasswordcodemail: updateUserPasswordcodemail,
    checkUserResetCode: checkUserResetCode,
    updateUserPassword: updateUserPassword,
    uploadPrfilePic:uploadPrfilePic,
    setNewUserName: setNewUserName,
    deleteUser:deleteUser
}

function userRegistration(full_name, email_address, password, username, dob, country, state, clasification_id, speciality_id, college) {

    return new Promise((resolve, reject) => {
        queryString = `INSERT INTO users (full_name, email_address, password,username,dob, country,state,clasification_id,speciality_id,college) VALUES (?,?,?,?,?,?,?,?,?,?)`;
        db.query(queryString, [full_name, email_address, password, username, dob, country, state, clasification_id, speciality_id, college], (error, result, fields) => {

            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else {
                dbFun.connectionRelease;
                resolve(result);
            }
        });
    })

}

function findUserByEmail(email_address) {
    console.log('MMMM', email_address);
    return new Promise((resolve, reject) => {
        db.query(`SELECT id,full_name,email_address,password,profile_pic,username,DATE_FORMAT(dob,"%Y-%m-%d") as dob,country,state,clasification_id,speciality_id,college,reset_password_code FROM users WHERE email_address='${email_address}'`, (error, result, fields) => {
            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else if (result) {
                dbFun.connectionRelease;
                resolve(result);
            }

        });
    })
}

function findUserByUsername(username) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT * FROM users WHERE username='${username}'`, (error, result, fields) => {
            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else if (result) {
                dbFun.connectionRelease;
                resolve(result);
            }

        });
    })
}

function updateUserPasswordcodemail(email_address, resetCode) {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE users set reset_password_code='${resetCode}' WHERE email_address='${email_address}'`, (error, result, fields) => {
            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else if (result) {
                dbFun.connectionRelease;
                resolve(result);
            }

        });
    })
}

function checkUserResetCode(email_address) {
    return new Promise((resolve, reject) => {
        db.query(`SELECT reset_password_code FROM users WHERE email_address='${email_address}'`, (error, result, fields) => {
            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else if (result) {
                dbFun.connectionRelease;
                resolve(result);
            }

        });
    })
}

function updateUserPassword(email_address,password) {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE users set password='${password}' WHERE email_address='${email_address}'`, (error, result, fields) => {
            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else if (result) {
                dbFun.connectionRelease;
                resolve(result);
            }

        });
    })
}

function uploadPrfilePic(id,profile_pic){
    return new Promise((resolve,reject)=>{
        db.query(`UPDATE users set profile_pic='${profile_pic}' WHERE id='${id}'`,(error, result, fields) =>{
            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else if (result) {
                dbFun.connectionRelease;
                resolve(result);
            }
        });
    });
}

function setNewUserName(email_address,new_username) {
    return new Promise((resolve, reject) => {
        db.query(`UPDATE users set username='${new_username}' WHERE email_address='${email_address}'`, (error, result, fields) => {
            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else if (result) {
                dbFun.connectionRelease;
                resolve(result);
            }

        });
    });
}

function deleteUser(email_address) {
    return new Promise((resolve, reject) => {
        queryString = `DELETE from users WHERE email_address = '${email_address}'`;
        db.query(queryString, [email_address], (error, result, fields) => {

            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else {
                dbFun.connectionRelease;
                resolve(result);
            }
        })
    })
}

module.exports = userSignUpModel;