const db = require('../mysql_config/database.js');
const dbFun = require('../mysql_config/database_function');


const masterModel = {
    masterBonusGet : masterBonusGet,
    masterCategoryGet:masterCategoryGet,
    masterClassificationGet : masterClassificationGet,
    masterDrugStoreGet : masterDrugStoreGet,
    masterPointsGet: masterPointsGet,
    masterRewardsGet : masterRewardsGet,
    masterSpecialityGet : masterSpecialityGet
}

//Master Bonus Model

function masterBonusGet(){
    return new Promise((resolve, reject)=>{
        queryString = `select mb.id,mb.day,mb.life_no,mb.value,ml.name as life_name from master_bonus as mb
        inner join master_life as ml on mb.life_no = ml.id `;
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


//Master Category Model

function masterCategoryGet(){
    return new Promise((resolve,reject)=>{
        queryString = `select * from master_categories`
        db.query(queryString,(error,result,fields)=>{
            
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

//Master Classification Model

function masterClassificationGet(){
    return new Promise((resolve,reject)=>{
        queryString = `select * from master_classification`
        db.query(queryString,(error,result,fields)=>{
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

//Master Drug Store Model

function masterDrugStoreGet(){
    return new Promise((resolve,reject)=>{
        queryString = `Select * from master_drug_store`;
        db.query(queryString,(error,result,fields)=>{
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

//Master Points Model

function masterPointsGet(){
    return new Promise((resolve, reject)=>{
        queryString = `select mp.id,mp.life_no,mp.points,ml.name as life_name from master_points as mp
        inner join master_life as ml on mp.life_no = ml.id `;
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

//Master Rewards Model

function masterRewardsGet(){
    return new Promise((resolve, reject)=>{
        queryString = `select * from master_rewards`;
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

//Master Speciality Model

function masterSpecialityGet(){
    return new Promise((resolve, reject)=>{
        queryString = `select * from master_speciality`;
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

module.exports = masterModel;