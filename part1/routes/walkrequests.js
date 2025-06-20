const express = require('express');
const router = express.Router();
const pool = require("../db");

router.get('/', async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
            SELECT WalkRequests.*, Dogs.name AS dog_name
            FROM WalkRequests
            JOIN Dogs ON WalkRequests.dog_id = Dogs.dog_id
            WHERE status = 'open
            
        `);
        res.json(rows);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
