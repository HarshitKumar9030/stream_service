const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  filePath: { type: String, required: true },
  hlsPath: { type: String, required: true },
  subtitles: [{ lang: String, path: String }],
  uploadDate: { type: Date, default: Date.now },
  views: { type: Number, default: 0 },
  apiToken: { type: String, required: true },
  watchStatus: { type: Boolean, default: false }, 
}, { timestamps: true });

module.exports = mongoose.model('Video', videoSchema);
