const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');


const leadershipboard_quiz_model = {
    leadershipboard_quiz: leadershipboard_quiz,
    leadershipboardmonth_quiz: leadershipboardmonth_quiz,
    leaderBoard: leaderBoard,
    leaderBoardMonth:leaderBoardMonth
}


function leadershipboard_quiz(category_id) {
    return new Promise((resolve, reject) => {
        const queryString = `(select id,category_id from pharma_db_dev_v1.single_player_quiz where week(played_on)=week(now())-1 AND category_id = ${category_id})union(select id,category_id from pharma_db_dev_v1.double_player_quiz where week(played_on)=week(now())-1 AND category_id = ${category_id})`;
        //const queryString = `Select (select count(category_id) from pharma_db_dev_v1.single_player_quiz where week(played_on)=week(now())-1 AND category_id = ${category_id})+(select count(category_id) from pharma_db_dev_v1.double_player_quiz where week(played_on)=week(now())-1 AND category_id = ${category_id}) as maxquiz`;
        db.query(queryString, (error, result, fields) => {
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


function leadershipboardmonth_quiz(category_id) {
    return new Promise((resolve, reject) => {
        const queryString = `(select id,category_id from pharma_db_dev_v1.single_player_quiz where month(played_on)=month(now())-1 AND category_id = ${category_id})union(select id,category_id from pharma_db_dev_v1.double_player_quiz where month(played_on)=month(now())-1 AND category_id = ${category_id});`;

        db.query(queryString, (error, result, fields) => {
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

function leaderBoard(user_id, category_id) {
    return new Promise((resolve, reject) => {
        const queryString = `select (select count(category_id) from single_player_quiz where month(played_on)=month(now())-1 AND category_id = ${category_id} AND user_id = ${user_id})+(select count(category_id) from double_player_quiz where month(played_on)=month(now())-1 AND category_id = ${category_id} AND user1_id = ${user_id} OR user2_id = ${user_id}) as maxQuiz`;
        db.query(queryString, (error, result, fields) => {

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

function leaderBoardMonth(user_id, category_id) {
    return new Promise((resolve, reject) => {
        const queryString = `select (select count(category_id) from single_player_quiz where week(played_on)=week(now())-1 AND category_id = ${category_id} AND user_id = ${user_id})+(select count(category_id) from double_player_quiz where week(played_on)=week(now())-1 AND category_id = ${category_id} AND user1_id = ${user_id} OR user2_id = ${user_id}) as maxQuiz`;
        db.query(queryString, (error, result, fields) => {

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

module.exports = leadershipboard_quiz_model;