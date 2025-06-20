const express = require('express');
const router = express.Router();
const pool = require("../db");

router.get('/', async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
            SELECT wr.request_id, d.name AS dog_name, wr.requested_time,
                wr.duration_minutes, wr.location, u.username AS owner_username
            FROM WalkRequests wr
            JOIN Dogs d ON wr.dog_id = d.dog_id
            JOIN Users u ON d.owner_id = u.user_id
            WHERE wr.status = 'open
        `);
        res.json(rows);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
