const Todo = require('../models/todo');

exports.checkID = async (req, res, next, val) => {
  const todoId = req?.params?.id;

  try {
    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return res.status(404).json({
        status: 'fail',
        message: 'Todo not found'
      });
    }

    next();
  } catch (error) {
    console.error('Error checking todo ID:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to check todo ID'
    });
  }
};

exports.checkBody = (req, res, next) => {
  if (
    !req?.body?.todoName ||
    !req?.body?.todoStatus ||
    !req?.body?.priority ||
    !req?.body?.dueDate
  ) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price'
    });
  }
  next();
};

exports.getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.findAll();

    res.status(200).json({
      status: 'success',
      requestedAt: req?.requestTime,
      results: todos?.length,
      data: {
        todos
      }
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch todos'
    });
  }
};

exports.getTodo = async (req, res) => {
  const todoId = req.params.id;

  try {
    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return res.status(404).json({
        status: 'fail',
        message: 'Todo not found'
      });
    }

    res.status(200).json({
      status: 'success',
      data: {
        todo
      }
    });
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch todo'
    });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const newTodo = await Todo.create(req?.body);
    res.status(201).json({
      status: 'success',
      data: {
        todo: newTodo
      }
    });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to create todo'
    });
  }
};

exports.updateTodo = async (req, res) => {
  const todoId = req?.params?.id;
  const { todoName, todoStatus, priority, dueDate } = req?.body;

  try {
    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return res.status(404).json({
        status: 'error',
        message: 'Todo not found'
      });
    }

    todo.todoName = todoName;
    todo.todoStatus = todoStatus;
    todo.priority = priority;
    todo.dueDate = dueDate;

    await todo.save();

    res.status(200).json({
      status: 'success',
      message: 'Todo updated successfully',
      data: {
        todo
      }
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to update todo'
    });
  }
};

exports.deleteTodo = async (req, res) => {
  const todoId = req?.params?.id;

  try {
    const todo = await Todo.findByPk(todoId);

    if (!todo) {
      return res.status(404).json({
        status: 'error',
        message: 'Todo not found'
      });
    }

    await todo.destroy();

    res.status(200).json({
      status: 'success',
      message: 'Todo deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete todo'
    });
  }
};
