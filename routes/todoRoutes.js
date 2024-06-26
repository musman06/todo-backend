const express = require('express');
const todoController = require('./../controllers/todoController');

const router = express.Router();

router.param('id', todoController.checkID);

router
  .route('/')
  .get(todoController.getAllTodos)
  .post(todoController.checkBody, todoController.createTodo);

router
  .route('/:id')
  .get(todoController.getTodo)
  .patch(todoController.checkBody, todoController.updateTodo)
  .delete(todoController.deleteTodo);

module.exports = router;
