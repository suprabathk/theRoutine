'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static addTask({ title, startTime, endTime, userID }) {
      return this.create({
        title,
        startTime,
        endTime,
        userID,
      });
    }

    static removeTask({ id, userID }) {
      return this.destroy({
        where: {
          id,
          userID,
        },
      });
    }

    static getTasks(userID) {
      return this.findAll({
        where: {
          userID,
        },
        order: [["id", "ASC"]],
      });
    }

    static getTaskAtSlot({ startTime, endTime }) {
      return this.findOne({
        where: {
          startTime,
          endTime,
        },
      });
    }

    static getTask({ userID, id }) {
      return this.findOne({
        where: {
          userID,
          id,
        },
      });
    }

    static async updateTask({ title, id }) {
      return this.update(
        {
          title,
        },
        {
          where: {
            id,
          },
        }
      );
    }

    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: "userID",
      });
    }
  }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNull: true,
      },
    },
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};