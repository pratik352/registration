const { StatusCodes } = require('http-status-codes');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: 'Access token is required',
      error: 'No token provided'
    });
  }

  if (token !== process.env.API_TOKEN) {
    return res.status(StatusCodes.FORBIDDEN).json({
      success: false,
      message: 'Invalid access token',
      error: 'Token verification failed'
    });
  }

  next();
};

module.exports = {
  authenticateToken
};