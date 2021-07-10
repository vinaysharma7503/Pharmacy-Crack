const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');

const quizModel = {
    doublePlayerQuiz: doublePlayerQuiz,
    doublePlayerQuizget: doublePlayerQuizget,
    doublePlayerQuizLifelines: doublePlayerQuizLifelines,
    doublePlayerQuizLifelinesget: doublePlayerQuizLifelinesget,
    singlePlayerQuiz: singlePlayerQuiz,
    singlePlayerQuizget: singlePlayerQuizget,
    singlePlayerQuizLifelines:singlePlayerQuizLifelines,
    singlePlayerQuizLifelinesget:singlePlayerQuizLifelinesget
}

function doublePlayerQuiz(category_id, user1_id, user2_id, winner_user_id, user1_score, user2_score, user1_answers, user2_answers, played_on, quiz_completed) {
    return new Promise((resolve, reject) => {
        queryString = `INSERT INTO double_player_quiz(category_id,user1_id,user2_id,winner_user_id,user1_score,user2_score,user1_answers,user2_answers,played_on,quiz_completed) VALUES(?,?,?,?,?,?,?,?,?,?)`;
        db.query(queryString, [category_id, user1_id, user2_id, winner_user_id, user1_score, user2_score, user1_answers, user2_answers, played_on, quiz_completed], (error, result, fields) => {
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

function doublePlayerQuizget() {
    return new Promise((resolve, reject) => {
        queryString = `select qz.id,qz.category_id,qz.user1_id,qz.user2_id,qz.winner_user_id,qz.user1_score,qz.user2_score,qz.user1_answers,qz.user2_answers,qz.played_on,qz.quiz_completed,mc.name as category_name,mc.color as category_color, u.full_name,u.username from double_player_quiz as qz
        inner join master_categories as mc on qz.category_id = mc.id
        inner join users as u1 on qz.user1_id = u1.id
        inner join users as u2 on qz.user2_id = u2.id
        inner join users as u on qz.winner_user_id = u.id `;
        db.query(queryString,(error, result, fields) => {
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

function doublePlayerQuizLifelines(user_id, quiz_id, question_id, life_no) {
    return new Promise((resolve, reject) => {
        queryString = `INSERT INTO double_player_quiz_lifelines_taken(user_id,quiz_id,question_id,life_no) VALUES(?,?,?,?)`;
        db.query(queryString, [user_id, quiz_id, question_id, life_no], (error, result, fields) => {
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

function doublePlayerQuizLifelinesget() {
    return new Promise((resolve, reject) => {
        queryString = `select * from double_player_quiz_lifelines_taken as qz
        inner join master_life as ml on qz.life_no = ml.id
        inner join questions as q on qz.question_id = q.id
        inner join double_player_quiz as dq on qz.quiz_id = dq.id
        inner join users as u on qz.user_id = u.id `;
        db.query(queryString,(error, result, fields) => {
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

function singlePlayerQuiz(category_id, user_id,score,answers, played_on) {
    return new Promise((resolve, reject) => {
        queryString = `INSERT INTO single_player_quiz(category_id, user_id,score,answers, played_on) VALUES(?,?,?,?,?)`;
        db.query(queryString, [category_id, user_id,score,answers, played_on], (error, result, fields) => {
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

function singlePlayerQuizget() {
    return new Promise((resolve, reject) => {
        queryString = `select qz.id,qz.category_id,qz.played_on,u.full_name,u.username,mc.name as category_name from single_player_quiz as qz
        inner join users as u on qz.user_id = u.id
        inner join master_categories as mc on qz.category_id = mc.id `;
        db.query(queryString,(error, result, fields) => {
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

function singlePlayerQuizLifelines(quiz_id,question_id,life_no) {
    return new Promise((resolve, reject) => {
        queryString = `INSERT INTO single_player_quiz_lifelines_taken(quiz_id,question_id,life_no) VALUES(?,?,?)`;
        db.query(queryString, [quiz_id,question_id,life_no], (error, result, fields) => {
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

function singlePlayerQuizLifelinesget() {
    return new Promise((resolve, reject) => {
        queryString = `select * from single_player_quiz_lifelines_taken as qz
        inner join questions as q on qz.question_id = q.id
        inner join single_player_quiz as sq on qz.quiz_id = sq.id `;
        db.query(queryString,(error, result, fields) => {
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

module.exports = quizModel;