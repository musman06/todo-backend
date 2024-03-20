const express = require('express');
const morgan = require('morgan');

const userRouter = require('./routes/userRoutes');
const todoRouter = require('./routes/todoRoutes');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allows all origins
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST,PATCH, PUT, DELETE, OPTIONS'
  );
  next();
});

// 1) MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/todo', todoRouter);

module.exports = app;
