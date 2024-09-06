const JWT_SECRET = 'your_jwt_secret';
const JWT_EXPIRY = '30m'; 
const TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000; 
const UPLOAD_DIR = './uploads/';
const HLS_DIR = './hls/';
const MONGO_URI = 'mongodb://localhost:27017/video_service'; 

module.exports = {
  JWT_SECRET,
  JWT_EXPIRY,
  TOKEN_REFRESH_INTERVAL,
  UPLOAD_DIR,
  HLS_DIR,
  MONGO_URI,
};
