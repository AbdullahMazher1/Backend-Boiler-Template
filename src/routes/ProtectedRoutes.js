const verifyToken = require('../middlewares/authMiddleware');
const router = require('express').Router();

router.post('/protected', verifyToken, (req, res) => res.json({ 'status': true, 'message': 'Protected Route' }));

module.exports = router;