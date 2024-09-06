const express = require('express');
const router = express.Router();
const { listVideos, streamVideo, getVideoInfo, refreshAccessToken } = require('../controllers/videoController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/list', listVideos); // admin-end function 
router.get('/stream/:id', authenticateToken, streamVideo);
router.get('/info/:id', authenticateToken, getVideoInfo);
router.post('/refresh-token/:id', authenticateToken, refreshAccessToken);

module.exports = router;
