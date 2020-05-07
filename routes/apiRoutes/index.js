const router = require('express').Router();

const authRoutes = require('./authRoutes');
// const userRoutes = require('./userRoutes');
// const todosRoutes = require('./todosRoutes');

//  /auth
router.use('/auth', authRoutes);
//  /user
// router.use('/user', userRoutes);
//  /todos
// router.use('/todos', todosRoutes);

module.exports = router;
