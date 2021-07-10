const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');

const questionModel = {
    getquestion: getquestion,
    postquestion: postquestion,
    postReportQuestion: postReportQuestion
}

//Question Model

function getquestion(level_no,category_id) {
    return new Promise((resolve, reject) => {

        queryString = `select q.id,q.level_no,q.question,q.category_id,q.option_1,q.option_2,q.option_3,q.option_4,q.correct_option,q.correct_points,mc.name as category_name from questions as q
        inner join master_categories as mc on q.category_id = mc.id where q.category_id = ${category_id} AND q.level_no = ${level_no} LIMIT 3`;

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

function postquestion(level_no, question, category_id, option_1, option_2, option_3, option_4, correct_option, correct_points, uploaded_by, user_id, is_active, submitted_on, limit) {

    const currentDate = submitted_on && submitted_on.split(' ')[0];

    return new Promise((resolve, reject) => {
        queryString = `SELECT count(user_id) as todaysQuesCount from questions WHERE  submitted_on = ? AND user_id = ?`;
        db.query(queryString, [currentDate, user_id], (error, result, fields) => {
            if (error) {
                reject(error);
                dbFun.connectionRelease;
            } else {
                const QusCount = Boolean(result.length) && result[0].todaysQuesCount
                if (QusCount < limit) {
                    queryString = `INSERT INTO questions(level_no, question, category_id, option_1, option_2, option_3, option_4, correct_option, correct_points, uploaded_by, user_id,is_active,submitted_on) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
                    db.query(queryString, [level_no, question, category_id, option_1, option_2, option_3, option_4, correct_option, correct_points, uploaded_by, user_id, is_active, submitted_on], (error, result, fields) => {
                        if (error) {
                            reject(error);
                            dbFun.connectionRelease;
                        } else {
                            resolve({ msg: "Thanks for submitting your question.", status: true });
                            dbFun.connectionRelease;
                        }
                    });
                } else {
                    resolve({ msg: "Reached to your limit.", status: false });
                    dbFun.connectionRelease;
                }
            }
        })


    })
}

//Report Question Model

function postReportQuestion(user_id, category_id, question_id, reason, done_on) {
    return new Promise((resolve, reject) => {
        queryString = `INSERT INTO report_questions(user_id,category_id,question_id,reason,done_on)VALUES(?,?,?,?,?)`;
        db.query(queryString, [user_id, category_id, question_id, reason, done_on], (error, result, fields) => {
            if (error) {
                reject(error);
                dbFun.connectionRelease;
            } else {
                resolve(result);
                dbFun.connectionRelease;
            }
        });
    });
}

module.exports = questionModel;