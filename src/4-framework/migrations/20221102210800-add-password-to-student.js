'use strict'

const { DataTypes } = require('sequelize')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) {
    await queryInterface.addColumn('student_history', 'password', {
      type: DataTypes.STRING,
      allowNull: false,
    })
  },

  async down(
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) {
    await queryInterface.removeColumn('student_history', 'password')
  },
}
