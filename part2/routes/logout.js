// routes/logout.js
const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to logout' });
    }
    res.clearCookie('connect.sid'); // 清除 cookie
    res.json({ message: 'Logged out successfully' });
  });
});

module.exports = router;
