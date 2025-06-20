const express = require('express');
const router = express.Router();
const pool = require("../db");

router.get('/', async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
            SELECT WalkRequests.* AS dog_name AS owner
            FROM Dogs
            JOIN Users ON Dogs.owner_id = Users.user_id
        `);
        res.json(rows);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
