const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');

const userSocialModel = {
    SocialModel: SocialModel,
    SocialRegisterModel:SocialRegisterModel,
    findUserByUserId:findUserByUserId,
    findUserByUserIdNSocialType:findUserByUserIdNSocialType
}

function SocialModel(user_id,credential_id,social_type) {

    return new Promise((resolve, reject) => {

        queryString = `INSERT INTO social_credentials(user_id,credential_id,social_type)VALUES(?,?,?)`;
        db.query(queryString,[user_id,credential_id,social_type], (error, result, fields) => {
            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else {
                dbFun.connectionRelease;
                resolve(result);
            }
        });
    });
}

function SocialRegisterModel(full_name, email_address,password, username,dob, country,state, clasification_id, speciality_id,college) {
    return new Promise((resolve,reject)=>{
        queryString = `INSERT INTO users(full_name, email_address,password, username,dob, country,state, clasification_id, speciality_id,college)VALUES(?,?,?,?,?,?,?,?,?,?)`;
        db.query(queryString,[full_name, email_address,password, username,dob, country,state, clasification_id, speciality_id,college], (error, result, fields) =>{
            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else {
                dbFun.connectionRelease;
                resolve(result);
            }
        });
    });
}

function findUserByUserId(user_id){
    return new Promise((resolve,reject)=>{
        queryString = `SELECT credential_id,social_type from social_credentials WHERE user_id = ?`;
        db.query(queryString,[user_id], (error, result, fields)=>{
            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else {
                dbFun.connectionRelease;
                resolve(result);
            }
        });
    });
}
function findUserByUserIdNSocialType(user_id,social_type){
    return new Promise((resolve,reject)=>{
        queryString = `SELECT credential_id,social_type from social_credentials WHERE user_id = ? AND social_type = ?`;
        db.query(queryString,[user_id,social_type], (error, result, fields)=>{
            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else {
                dbFun.connectionRelease;
                resolve(result);
            }
        });
    });
}


module.exports = userSocialModel;

