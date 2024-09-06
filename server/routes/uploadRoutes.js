const express = require('express');
const router = express.Router();
const { uploadVideo } = require('../controllers/uploadController');

router.post('/', uploadVideo);

module.exports = router;
