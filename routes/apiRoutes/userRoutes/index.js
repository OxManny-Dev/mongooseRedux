const router = require('express').Router();
const {
  addTodo,
  getAllUserEmails,
  getUserTodos,
  deleteUserTodoById,
  updateTodoById,
} = require('./../../../controllers/userController');
const { requireAuth } = require('./../../../middlewares/authMiddleware');

// /api/user/todo
router.route('/todo')
  .post(requireAuth, addTodo)
  .get(requireAuth, getUserTodos);


// /api/user/todo/:todoId
router.route('/todo/:todoId')
  .delete(requireAuth, deleteUserTodoById)
  .put(requireAuth, updateTodoById);


// /api/user/emails
router.get('/emails',  getAllUserEmails);

module.exports = router;



