const router = require('express').Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
const todoRoutes = require('./todoRoutes');

//  /api/auth
router.use('/auth', authRoutes);

//  /api/user
router.use('/user', userRoutes);

// /api/todo
router.use('/todo', todoRoutes);
module.exports = router;
