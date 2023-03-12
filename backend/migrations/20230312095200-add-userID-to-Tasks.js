'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Tasks", "userID", {
      type: Sequelize.DataTypes.INTEGER,
    });
    await queryInterface.addConstraint("Tasks", {
      fields: ["userID"],
      type: "foreign key",
      onDelete: "CASCADE",
      references: {
        table: "Users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Tasks", "userID");
  }
};
