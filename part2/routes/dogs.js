const express = require('express');
const router = express.Router();
const db = require('../models/db');

router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Dogs');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error'});
  }
});

// GET /api/dogs/owner/:ownerId
router.get('/owner/:ownerId', async (req, res) => {
  try {
    const { ownerId } = req.params;
    const [rows] = await db.query(
      'SELECT dog_id, name FROM Dogs WHERE owner_id = ?',
      [ownerId]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve dogs for owner' });
  }
});

module.exports = router;
