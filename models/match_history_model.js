const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');

const matchHistory = {
    winMatches:winMatches,
    lossMatches:lossMatches
}

function winMatches(winner_user_id) {
    return new Promise((resolve, reject) => {
        queryString = `SELECT COUNT((winner_user_id)) as Wins from double_player_quiz WHERE winner_user_id= ${winner_user_id}`;
        db.query(queryString,[winner_user_id],(error, result, fields)=>{
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

function lossMatches(winner_user_id) {
    return new Promise((resolve, reject) => {
        queryString = `select(select count(winner_user_id) from double_player_quiz where user1_id = ${winner_user_id} or user2_id = ${winner_user_id})-(select count(winner_user_id) from double_player_quiz where winner_user_id = ${winner_user_id})
        as Losses`;
        db.query(queryString,[winner_user_id],(error, result, fields)=>{
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

module.exports = matchHistory;