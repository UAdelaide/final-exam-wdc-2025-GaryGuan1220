const express = require('express');
const router = express.Router();
const pool = require("../db");

router.get('/', async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
            SELECT Dogs.name AS dog_name, Dogs.size, Users.username AS owner_username
            FROM Dogs
            JOIN Users ON Dogs.owner_id = Users.user_id
        `);
        res.json(rows);
    } catch (error) {
        console.error('🐶 Error in /api/dogs:', error);  // 添加日志
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
