const express = require('express');
const router = express.Router();
const mysql = require('mysql2');
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
});
const promisePool = pool.promise();

router.get('/', async function (req, res, next) {
    const [rows] = await promisePool.query("SELECT * FROM hl21users");
    
    res.render('users.njk', {
        rows: rows,
        title: 'Users',
    });
    
});

router.get('/:id', async function (req, res, next) {
    const userNr = req.params.id;
    const [user] = await promisePool.query("SELECT * FROM hl21users WHERE id=?", userNr);
    
    res.render('user.njk', {
        user: user[0],
        title: 'User',
    });
    
});


module.exports = router;