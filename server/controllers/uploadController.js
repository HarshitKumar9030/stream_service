const Video = require('../models/video');
const { createHLSStream } = require('../services/videoService');
const multer = require('multer');
const { UPLOAD_DIR, HLS_DIR } = require('../constants');
const path = require('path');

const upload = multer({ dest: UPLOAD_DIR });


const uploadVideo = (req, res) => {
  upload.single('video')(req, res, async (err) => {
    if (err) return res.status(500).send('Error uploading file');

    const { title, description, apiToken } = req.body;
    const file = req.file;

    if (!file) return res.status(400).send('No file uploaded');

    const filePath = path.join(UPLOAD_DIR, file.filename);
    const hlsOutputDir = path.join(HLS_DIR, file.filename);

    try {
      await createHLSStream(filePath, hlsOutputDir);

      const video = new Video({
        title,
        description,
        filePath,
        hlsPath: `${hlsOutputDir}/index.m3u8`,
        apiToken, 
      });

      await video.save();
      res.json(video);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error processing video');
    }
  });
};

module.exports = { uploadVideo };
