const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');

const matchResult = {
    gameResult: gameResult
}

function gameResult(game_id){
    return new Promise((resolve, reject)=>{
        queryString = `SELECT user1_score,user2_score from double_player_quiz WHERE id = ${game_id}`;
        db.query(queryString,(error, result, fields)=>{
            
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

module.exports = matchResult;