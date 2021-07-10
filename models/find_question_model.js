const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');



exports.findQuestion = () => {
    return new Promise((resolve, reject) => {
        const queryString = `SELECT json_extract(answers,'$.question_id','$.answers') as answers FROM single_player_quiz`;
        db.query(queryString, (error, result, fields) => {
            if (error) {
                dbFun.connectionRelease;
                reject(error);
            } else {
                const queryStrings = `SELECT json_extract(user1_answers,'$.question_id','$.answers') as user1_answers,json_extract(user2_answers,'$.question_id','$.answers') as user2_answers FROM double_player_quiz;`;
                db.query(queryStrings, (error, result, fields) => {
                    if (error) {
                        dbFun.connectionRelease;
                        reject(error);
                    } else {
                        dbFun.connectionRelease;
                        resolve(result);
                    }
                })
                dbFun.connectionRelease;
            }
        })

    })

}
