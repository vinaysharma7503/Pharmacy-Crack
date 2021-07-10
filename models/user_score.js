const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');

exports.userScoreGet = (user_id) => {
    return new Promise((resolve, reject) => {
        const queryString = `Select (SELECT sum(user1_score) from double_player_quiz where user1_id =?) + ( SELECT sum(user2_score) from double_player_quiz where user2_id =?) + ( SELECT sum(score) from single_player_quiz where user_id =?) as score`;
        db.query(queryString, [user_id, user_id, user_id], (error, result, fields) => {
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