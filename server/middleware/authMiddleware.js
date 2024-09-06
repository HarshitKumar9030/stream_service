const jwt = require('jsonwebtoken');
const Video = require('../models/video');
const { JWT_SECRET } = require('../constants');

/**
 * Middleware to authenticate the token and verify access to the video.
 */

const authenticateToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  const videoId = req.params.id;

  if (!token) return res.sendStatus(401); 

  try {
    const video = await Video.findById(videoId);
    if (!video) return res.sendStatus(404); 

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err || decoded.apiToken !== video.apiToken) return res.sendStatus(403);
      req.video = video; 
      req.tokenDecoded = decoded;
      next(); 
    });
  } catch (err) {
    console.error('Error in authentication middleware:', err);
    return res.sendStatus(500); 
  }
};

module.exports = { authenticateToken };
