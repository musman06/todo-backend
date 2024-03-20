const fs = require('fs');

const todos = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/todos.json`)
);

exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);

  if (req.params.id * 1 > todos?.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  if (
    !req?.body?.name ||
    !req?.body?.status ||
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

exports.getAllTodos = (req, res) => {
  console.log(req.requestTime);

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: todos?.length,
    data: {
      todos
    }
  });
};

exports.getTodo = (req, res) => {
  console.log(req.params);
  const id = req?.params?.id * 1;

  const todo = todos.find(el => el?.id === id);

  res.status(200).json({
    status: 'success',
    data: {
      todo
    }
  });
};

exports.createTodo = (req, res) => {
  const newId = todos?.[todos?.length - 1]?.id + 1;
  const newTodo = Object.assign({ id: newId }, req.body);

  todos.push(newTodo);

  fs.writeFile(
    `${__dirname}/../dev-data/data/todos.json`,
    JSON.stringify(todos),
    err => {
      if (err) {
        console.error(err);
        res.status(500).json({
          status: 'error',
          message: 'Failed to write to file'
        });
        return;
      }
      res.status(201).json({
        status: 'success',
        data: {
          todo: newTodo
        }
      });
    }
  );
};

exports.updateTodo = (req, res) => {
  const id = req?.params?.id * 1;
  const newTodos = todos?.map(todo =>
    todo?.id === id ? { id, ...req?.body } : todo
  );

  fs.writeFile(
    `${__dirname}/../dev-data/data/todos.json`,
    JSON.stringify(newTodos),
    err => {
      if (err) {
        console.error(err);
        res.status(500).json({
          status: 'error',
          message: 'Failed to write to file'
        });
        return;
      }
      res.status(200).json({
        status: 'success',
        data: {
          todo: newTodos?.find(todo => todo?.id === id)
        }
      });
    }
  );
};

exports.deleteTodo = (req, res) => {
  const id = req?.params?.id * 1;
  const newTodos = todos?.filter(todo => todo?.id !== id);

  fs.writeFile(
    `${__dirname}/../dev-data/data/todos.json`,
    JSON.stringify(newTodos),
    err => {
      if (err) {
        console.error(err);
        res.status(500).json({
          status: 'error',
          message: 'Failed to write to file'
        });
        return;
      }
      res.status(200).json({
        status: 'success'
      });
    }
  );
};
