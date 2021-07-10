const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');

exports.userSubscription = (user_id,drug_store_id,subscription_details,os_taken_on,taken_on)=>{
    return new Promise((resolve,reject)=>{
        const queryString = `INSERT INTO user_subscriptions(user_id,drug_store_id,subscription_details,os_taken_on,taken_on) VALUES(?,?,?,?,?)`;
        db.query(queryString, [user_id,drug_store_id,subscription_details,os_taken_on,taken_on], (error, result, fields)=>{
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