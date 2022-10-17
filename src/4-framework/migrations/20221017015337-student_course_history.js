'use strict'

const { DataTypes } = require('sequelize')

module.exports = {
  async up(
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) {
    await queryInterface.createTable('student_course', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.STRING(40),
        allowNull: false,
        unique: true,
      },
      course_id: {
        type: DataTypes.NUMBER,
        allowNull: true,
        references: {
          key: 'id',
          model: 'course_history',
        },
      },
      student_id: {
        type: DataTypes.NUMBER,
        allowNull: true,
        references: {
          key: 'id',
          model: 'student_history',
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    })
  },

  async down(
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) {
    await queryInterface.dropTable('student_course')
  },
}
