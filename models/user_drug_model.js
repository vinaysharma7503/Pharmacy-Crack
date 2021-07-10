const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');

const drugModel = {
    drugStore: drugStore,
    drugStoreget: drugStoreget
}

function drugStore(drug_id, taken_on, payment_response, payment_platform_taken, spent_pills) {
    return new Promise((resolve, reject) => {
        queryString = `INSERT INTO user_drug_store(drug_id,taken_on,payment_response,payment_platform_taken,spent_pills) VALUES(?,?,?,?,?)`;
        db.query(queryString, [drug_id, taken_on, payment_response, payment_platform_taken, spent_pills], (error, result, fields) => {
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

function drugStoreget() {
    return new Promise((resolve, reject) => {
        queryString = `select * from user_drug_store as uds
        inner join users as u on uds.user_id = u.id 
        inner join master_drug_store as mds on uds.drug_id = mds.id `;
        db.query(queryString,(error, result, fields) => {
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
module.exports = drugModel;