const router = require('express').Router();

const { getTodos } = require('./../../../controllers/todoController');

// /api/todo
router.route('/')
  .get(getTodos);

module.exports = router;
