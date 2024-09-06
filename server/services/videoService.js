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
    .output(`${outputDir}/index_360p.m3u8`)
    .videoCodec('libx264')
    .size('640x360')
    .addOptions(['-profile:v baseline', '-level 3.0', '-start_number 0', '-hls_time 10', '-hls_list_size 0', '-f hls'])
    .output(`${outputDir}/index_480p.m3u8`)
    .videoCodec('libx264')
    .size('854x480')
    .addOptions(['-profile:v baseline', '-level 3.0', '-start_number 0', '-hls_time 10', '-hls_list_size 0', '-f hls'])
    .output(`${outputDir}/index_720p.m3u8`)
    .videoCodec('libx264')
    .size('1280x720')
    .addOptions(['-profile:v baseline', '-level 3.0', '-start_number 0', '-hls_time 10', '-hls_list_size 0', '-f hls'])
    .on('end', () => resolve('HLS stream created successfully'))
    .on('error', (err) => reject(err))
    .run();
  });
};

module.exports = {
  createHLSStream,
};


