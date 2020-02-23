const {Pool,Client} = require('pg');

const pool = new Pool({
    user : "postgres",
    password : "123456",
    host : "localhost",
    database : "company",
    port : 5432

});

module.exports = pool;