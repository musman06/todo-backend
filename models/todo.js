// models/todo.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('todo-db', 'root', 'kitten12345678', {
  host: 'localhost',
  dialect: 'mysql'
});

const Todo = sequelize.define(
  'Todo',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    todoName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    todoStatus: {
      type: DataTypes.ENUM('pending', 'completed', 'overDue'),
      defaultValue: 'pending'
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high'),
      defaultValue: 'medium'
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    timestamps: true,
    tableName: 'todos'
  }
);

module.exports = Todo;
