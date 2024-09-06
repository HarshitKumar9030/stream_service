const ffmpeg = require('fluent-ffmpeg');
const { HLS_DIR } = require('../constants');
const fs = require('fs');
ffmpeg.setFfmpegPath('C:\\ffmpeg\\bin\\ffmpeg.exe'); // Replace with the actual path to ffmpeg.exe on your system

/**
 * Creates an HLS stream from the uploaded video file.
 * @param {string} filePath - The path to the uploaded video file.
 * @param {string} outputDir - The output directory for the HLS stream.
 * @returns {Promise} - A promise that resolves when the HLS stream is created.
 */
const createHLSStream = (filePath, outputDir) => {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true }); // Create the directory if it does not exist
    }

    ffmpeg(filePath)
      .addOptions([
        '-profile:v baseline',  // For compatibility with most devices
        '-level 3.0',
        '-start_number 0',      // Start segment numbering from 0
        '-hls_time 10',         // Duration of each segment in seconds
        '-hls_list_size 0',     // Include all segments in the playlist
        '-f hls'                // HLS format
      ])
      .output(`${outputDir}/index.m3u8`)  
      .on('start', (commandLine) => {
        console.log('FFmpeg process started:', commandLine);  
      })
      .on('end', () => resolve('HLS stream created successfully'))
      .on('error', (err, stdout, stderr) => {
        console.error('Error occurred during FFmpeg processing:', err.message);
        console.error('FFmpeg stderr output:', stderr);  
        reject(err);
      })
      .run();
  });
};

module.exports = {
  createHLSStream,
};