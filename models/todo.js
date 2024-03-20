const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
  'todo-db',
  'avnadmin',
  'AVNS_wMcr1HfxxONrZcdvXEQ',
  {
    host: 'todo-mysql-todo-mysql.a.aivencloud.com',
    port: 24668,
    dialect: 'mysql'
  }
);

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
