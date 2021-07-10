const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');

const contactModel = {
    getcontact:getcontact,
    postcontact:postcontact
}

function getcontact(){
    return new Promise((resolve,reject)=>{
        queryString = `select * from contact_queries as cq
        inner join users as u on cq.user_id = u.id`;
        db.query(queryString,(error,result,fields)=>{
            if (error){
                dbFun.connectionRelease;
                reject(error);
            }else{
                dbFun.connectionRelease;
                resolve(result);
            }
        });
    })
}

function postcontact(user_id, query, submitted_on){
    return new Promise((resolve,reject)=>{
        queryString = `INSERT INTO contact_queries(user_id,query,submitted_on)VALUES(?,?,?)`;
        db.query(queryString,[user_id,query,submitted_on],(error,result,fields)=>{
            if (error){
                dbFun.connectionRelease;
                reject(error);
            }else{
                dbFun.connectionRelease;
                resolve(result);
            }
        });
    })
}

module.exports = contactModel;