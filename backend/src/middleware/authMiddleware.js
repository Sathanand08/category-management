import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
           res.status(401);
           throw new Error('Not authorized, user not found');
      }

      next();

    } catch (error) {
      console.error('Token verification failed:', error);
      res.status(401);
      if (error.name === 'JsonWebTokenError') {
          throw new Error('Not authorized, token failed (invalid)');
      } else if (error.name === 'TokenExpiredError') {
          throw new Error('Not authorized, token expired');
      } else {
          throw new Error('Not authorized, token failed');
      }
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }
});

export { protect };
