const express = require('express');
const router = express.Router();
const pool = require("../db");

router.get('/', async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
            SELECT u.username AS walker_username,
                COUNT(r.rating_id) AS total_ratings,
                ROUND(AVG(r.rating), 1) AS average_rating,
                COUNT(CASE WHEN wr.status = 'completed' THEN 1 END) AS completed_walks
            FROM Users u
            LEFT JOIN WalkRatings r ON u.user_id = r.walker_id
            LEFT JOIN WalkRequests wr ON r.request_id = wr.request_id
            WHERE u.role = 'walker'
            GROUP BY u.user_id
        `);
        res.json(rows);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
