'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) {
    await queryInterface.addColumn('student_history', 'role_id', {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        key: 'id',
        model: 'role_history',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
    })
  },

  async down(
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) {
    await queryInterface.removeColumn('student_history', 'role_id')
  },
}
