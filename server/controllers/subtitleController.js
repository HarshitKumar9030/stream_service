const Subtitle = require('../models/subtitle');
const path = require('path');
const fs = require('fs');

exports.uploadSubtitle = async (req, res) => {
  try {
    const { videoId, language, label } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).send('Subtitle file is required');
    }

    const filename = `${Date.now()}-${file.originalname}`;
    const uploadPath = path.join(__dirname, '..', 'public', 'subtitles', filename);

    fs.writeFileSync(uploadPath, file.buffer);

    const subtitle = new Subtitle({ videoId, language, label, filename });
    await subtitle.save();

    res.status(201).json({ message: 'Subtitle uploaded successfully', subtitle });
  } catch (error) {
    console.error('Error uploading subtitle:', error);
    res.status(500).send('Server error');
  }
};

exports.getSubtitlesForVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const subtitles = await Subtitle.find({ videoId });

    if (!subtitles || subtitles.length === 0) {
      return res.status(404).send('No subtitles found for this video');
    }

    res.json(subtitles);
  } catch (error) {
    console.error('Error fetching subtitles:', error);
    res.status(500).send('Server error');
  }
};

exports.serveSubtitle = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '..', 'public', 'subtitles', filename);

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.status(404).send('Subtitle file not found');
    }
  } catch (error) {
    console.error('Error serving subtitle:', error);
    res.status(500).send('Server error');
  }
};
