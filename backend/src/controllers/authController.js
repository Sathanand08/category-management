import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d', 
  });
};

const signupAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log('Signup Request Body:', req.body);

  if (!email || !password) {
    res.status(400);
    throw new Error('Please provide email and password');
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists with that email');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    password: hashedPassword,
  });

  if (user) {
    const token = generateToken(user._id);

    res.status(201).json({
      _id: user._id,
      email: user.email,
      token: token,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    return res.json({ message: 'Please provide email and password' });
  }

  const user = await User.findOne({ email }).select('+password');

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = generateToken(user._id);

    res.status(200).json({ 
      _id: user._id,
      email: user.email,
      token: token,
    });
  } else {
    res.status(401);
    return res.json({ message: 'Invalid email or password' });
  }
});


export { signupAdmin, loginAdmin };