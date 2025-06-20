const express = require('express');
const router = express.Router();
const pool = require("../db");

router.get('/', async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                u.username,
                COUNT(a.application_id) AS applications,
                SUM(CASE WHEN a.status = 'accepted' THEN 1 ELSE 0 END) AS accepted_walks
            FROM Users.u
            LEFT JOIN WalkApplications a ON u.user_id = a.walker_id
            WHERE u.role = 'open'
        `);
        res.json(rows);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
