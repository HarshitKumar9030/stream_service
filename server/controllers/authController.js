const { generateAccessToken } = require('../utils/tokenUtils');
const Video = require('../models/video');

const generateToken = async (req, res) => {
  const { apiToken, videoId } = req.body;
  
  try {
    const video = await Video.findById(videoId);
    if (!video || video.apiToken !== apiToken) return res.sendStatus(403);

    const token = generateAccessToken(apiToken);
    res.json({ token });
  } catch (error) {
    res.status(500).send('Error generating token');
  }
};

module.exports = { generateToken };
