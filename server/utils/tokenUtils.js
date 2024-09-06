const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY, TOKEN_REFRESH_INTERVAL } = require('../constants');

const generateAccessToken = (apiToken) => {
  return jwt.sign({ apiToken }, JWT_SECRET, { expiresIn: JWT_EXPIRY });
};

const extendToken = (apiToken, currentExpiry) => {
  const now = Math.floor(Date.now() / 1000); 
  const newExpiry = Math.max(currentExpiry, now + TOKEN_REFRESH_INTERVAL / 1000);
  return jwt.sign({ apiToken, exp: newExpiry }, JWT_SECRET);
};

module.exports = {
  generateAccessToken,
  extendToken,
};
