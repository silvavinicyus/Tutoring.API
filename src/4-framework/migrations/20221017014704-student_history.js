'use strict'

const { DataTypes } = require('sequelize')

module.exports = {
  async up(
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) {
    await queryInterface.createTable('student_history', {
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
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      registration_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      cpf: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      img_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      major_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          key: 'id',
          model: 'major_history',
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
      },
      period: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      records_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      device_token: {
        type: DataTypes.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('student_history')
  },
}
