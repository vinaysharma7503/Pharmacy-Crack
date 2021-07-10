const express = require('express');// Express Server Import
const app = express(); // Express Server Assign
const med_routes = require('../routers/user_routes'); // Routes Import
const db_config = require('../mysql_config/database_function'); //Database_Config Import
const PlayFab = require('../social/playfab_setup');


function initilization() {
    setUpDatabase(); //Database Initilise
    setupBodyParser();
    setUpRoutes();
    setupError404Handler();
    setupErrorHandler();
}

initilization();

function setupBodyParser() {
    app.use(express.urlencoded({ extended: true })); //in methods always use colons
    app.use(express.json());
}

function setUpDatabase() {
    db_config.connectionCheck.then((data) => {
        console.log('connection check function=' + data);
    }).catch((err) => {
        console.log(err);
    });
}

function setUpRoutes() {
    app.use('/api/v1', med_routes);
}

function setupError404Handler() {
    app.use((req, res) => {
        res.status(404).json({
            message: 'NOT FOUND',
            status: 404
        });
    });
}

function setupErrorHandler() {
    app.use((err, req, res, next) => {
        
        res.status(req.errorStatus || 500).json({
            message: err.message || "Something went wrong. Please try again later",
            status: req.errorStatus || 500
        });
    });
}
module.exports = app;