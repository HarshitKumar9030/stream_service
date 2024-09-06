const express = require('express');
const multer = require('multer');
const { uploadSubtitle, getSubtitlesForVideo, serveSubtitle } = require('../controllers/subtitleController');
const { authMiddleware } = require('../middleware/authMiddleware');

const router = express.Router();
const upload = multer(); 

router.post('/upload', authMiddleware, upload.single('subtitle'), uploadSubtitle);

router.get('/:videoId', getSubtitlesForVideo);

router.get('/file/:filename', serveSubtitle);

module.exports = router;
