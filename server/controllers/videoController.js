const Video = require('../models/video');
const { extendToken } = require('../utils/tokenUtils');
const path = require('path');


const streamVideo = async (req, res) => {
  const { id } = req.params;
  
  try {
    const video = await Video.findById(id);

    if (!video) {
      return res.status(404).send('Video not found');
    }

    const baseName = path.basename(video.filePath); 

    const hlsPath = path.join(__dirname, '..', 'hls', baseName, 'index.m3u8');

    console.log(hlsPath)
    res.json({ streamUrl: `/hls/${baseName}/index.m3u8` });
  } catch (error) {
    console.error('Error streaming video:', error);
    res.status(500).send('Error streaming video');
  }
};

const getVideoInfo = async (req, res) => {
  const video = req.video;
  res.json(video);
};

const refreshAccessToken = async (req, res) => {
  const video = req.video;
  const decoded = req.tokenDecoded;

  if (video.watchStatus) {
    const newToken = extendToken(decoded.apiToken, decoded.exp);
    res.json({ token: newToken });
  } else {
    res.status(400).send('Video is no longer being watched');
  }
};

const listVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).send('Error fetching videos');
  }
};

module.exports = { listVideos, streamVideo, getVideoInfo, refreshAccessToken };
