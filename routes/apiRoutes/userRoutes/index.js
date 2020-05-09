const router = require('express').Router();
const { addTodo, getAllUserEmails } = require('./../../../controllers/userController');

// /api/user/todos
router.route('/todos')
  .post(addTodo);

// /api/user/emails
router.get('/emails', getAllUserEmails);

module.exports = router;
