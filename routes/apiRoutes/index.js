const router = require('express').Router();

const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');
// const todosRoutes = require('./todosRoutes');

//  /api/auth
router.use('/auth', authRoutes);
//  /api/user
router.use('/user', userRoutes);
//  /todos
// router.use('/todos', todosRoutes);

module.exports = router;
