const mysql = require('mysql');
require('dotenv').config();

const connection = {
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

module.exports = connection;