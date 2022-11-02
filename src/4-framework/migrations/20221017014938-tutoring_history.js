'use strict'

const { DataTypes } = require('sequelize')

module.exports = {
  async up(
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) {
    await queryInterface.createTable('tutoring_history', {
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
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          key: 'id',
          model: 'course_history',
        },
      },
      major_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          key: 'id',
          model: 'major_history',
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      vacancy_INTEGER: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      with_payment: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      payment_value: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    })
  },

  async down(
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) {
    await queryInterface.dropTable('tutoring_history')
  },
}
