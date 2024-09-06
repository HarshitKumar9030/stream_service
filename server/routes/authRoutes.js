const express = require('express');
const router = express.Router();
const { generateToken } = require('../controllers/authController');

router.post('/generate-token', generateToken);

module.exports = router;
