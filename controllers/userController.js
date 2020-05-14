const { User, Todo } = require('./../models');

module.exports = {
  getUserTodos: async (req, res) => {
    console.log(req.user);
    try {
      // const user = await User.findById(req.user._id).populate('todos', 'completed');
      // return res.status(400).json(user.todos)
      const userTodos = await Todo.find({ user: req.user._id }, 'completed text');
      return res.status(200).json(userTodos);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  addTodo: async (req, res) => {
    console.log("Im hit");
    const { text } = req.body;
    if (!text) {
      return res.status(403).json({ error: 'You must provide a text '});
    }
    try {
      const newTodo = await new Todo({text, user: req.user._id}).save();
      req.user.todos.push(newTodo);
      await req.user.save();
      return res.status(200).json(newTodo);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  getAllUserEmails: async (req, res) => {
    try {
      const userEmails = await User.find({}, 'email');
      if (!userEmails) { return res.status(404).json({ error: 'No user emails found '});}
      return res.status(200).json(userEmails);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  deleteUserTodoById: async (req, res) => {
    const { todoId } = req.params;
    try {
      const todoToDelete = await Todo.findById(todoId);
      if (!todoToDelete) {
        return res.status(401).json({ error: 'No todo with that id' });
      }
      // Check if the current todo belongs to the current logged in user
      if(req.user._id.toString() !== todoToDelete.user.toString()) {
        return res.status(401).json({ error: 'You cannot delete a todo that is not yours!' });
      }
      const deletedTodo = await Todo.findByIdAndDelete(todoId);
      return res.status(200).json(deletedTodo);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
  updateTodoById: async (req, res) => {
    const { todoId } = req.params;
    const { text, completed } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'You must provide a text' });
    }
    try {
      const todoToUpdate = await Todo.findById(todoId);
      if (!todoToUpdate) {
        return res.status(404).json({ error: 'No todo with that id' });
      }
      if(req.user._id.toString() !== todoToUpdate.user.toString()) {
        return res.status(401).json({ error: 'You cannot update a todo that is not yours!' });
      }
      const updatedTodo = await Todo.findByIdAndUpdate(todoId,
        { completed, text },
        { new: true });
      return res.status(200).json(updatedTodo);
    } catch (e) {
      return res.status(403).json({ e });
    }
  },
};




// Inside of the userController
// Create a function called 'updateTodoById'
// expect the todoId from req.params
// expect the 'text' and 'completed' properties from req.body.
//   Check if the text field is valid.
//   If it's not valid, return a status of 400 and a json error that says 'You must provide a text'
// Attempt to find the todo in the database,
//   If there is no todo, return a status of 404 and a json error that says "No todo with that Id"
// Check if the todo belongs to the logged in user
// If not, return a response with a status of 401 and an error that says "You cannot update a todo that's not yours"
// If the user makes it past through all of the checks, update the todo's text and completed properties by it's ID.
//   return a response with the newly updated todo.
// (By default mongoose will return a todo object before it was updated. Read the documentation on how to return the new version instead)
// You may use the code below for the catch block
// return res.status(403)json(e)

/*
Bonus, wire this up on the router!
 */




