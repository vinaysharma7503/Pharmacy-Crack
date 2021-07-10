const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');


const IQMAP = {
postIQMAP:postIQMAP,
getIQMAP:getIQMAP
}


function postIQMAP(user_id,level_no,quiz_id,category_id){
    return new Promise((resolve,reject)=>{
        const queryString = `INSERT INTO user_completed_levels(user_id,level_no,quiz_id,category_id)VALUES(?,?,?,?)`;
        db.query(queryString, [user_id,category_id,level_no,quiz_id,category_id], (error, result, fields) => {
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

function getIQMAP(user_id) {
    return new Promise((resolve, reject) => {
        queryString = `SELECT * from user_completed_levels where user_id = ${user_id}`;
        db.query(queryString, (error, result, fields) => {

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

module.exports = IQMAP;