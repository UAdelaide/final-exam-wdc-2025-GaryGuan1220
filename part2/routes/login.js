// routes/login.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query(
      `SELECT * FROM Users WHERE username = ? AND password_hash = ?`,
      [username, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = rows[0];
    req.session.user = {
      username: user.username,
      role: user.role
    };

    res.json({
      message: 'Login successful',
      redirect: user.role === 'owner' ? '/owner-dashboard.html' : '/walker-dashboard.html'
    });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

