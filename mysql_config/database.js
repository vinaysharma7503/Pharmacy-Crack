const mysql = require('mysql');
const env = require('../environment/env');

module.exports = mysql.createPool({
    connectionLimit: 100,
    host: env.DB_HOST_API_V1,
    database: env.DB_DATABASE_API_V1,
    user: env.DB_USERNAME_API_V1,
    password: env.DB_PASSWORD_API_V1
}) 