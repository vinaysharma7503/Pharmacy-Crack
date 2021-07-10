const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');

exports.getStatus = (user_id,category_id)=>{
    return new Promise((resolve,reject)=>{
        const queryString = `SELECT(SELECT COUNT(category_id) from single_player_quiz where user_id = ${user_id} AND category_id = ${category_id}) +(SELECT COUNT(category_id) from double_player_quiz where user1_id = ${user_id} OR user2_id = ${user_id} AND category_id = ${category_id}) as category_percentage`;
        db.query(queryString,(error, result, fields)=>{
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