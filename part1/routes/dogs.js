const express = require('express');
const router = express.Router();
const pool = require("../db");

router.get('/', async (req, res, next) -> {
    try {
        const [rows] = await pool.query(`

            `)
    } catch (error) {

    }
});