const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');

const dashboardModel = {
    dashboard: dashboard,
    dashboardget: dashboardget
}

function dashboard(user_id,life_no, reward_no, points, score, earned_on, used_on, earned_type, used_type, level_achieved, level_achieved_on) {

    return new Promise((resolve, reject) => {
        queryString = `INSERT INTO dashboard(user_id,life_no,reward_no,points,score,earned_on,used_on,earned_type,used_type,level_achieved,level_achieved_on) VALUES(?,?,?,?,?,?,?,?,?,?,?)`;
        db.query(queryString, [user_id,life_no, reward_no, points, score, earned_on, used_on, earned_type, used_type, level_achieved, level_achieved_on], (error, result, fields) => {
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

function dashboardget() {
    return new Promise((resolve, reject) => {
        queryString = `select * from dashboard as d
        inner join users as u on d.user_id = u.id 
        inner join master_life as ml on d.life_no = ml.id
        inner join master_rewards as mr on d.reward_no = mr.id `;
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

module.exports = dashboardModel;