'use strict'

const { v4 } = require('uuid')
const { hash } = require('bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) => {
    const password = await hash('admin_password', 8)

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        uuid: v4(),
        name: 'admin',
        email: 'admin@admin.com',
        password,
        phone: '82981818181',
        birthdate: new Date('2000-07-25'),
        role_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  down: async (
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) => {
    await queryInterface.bulkDelete('users', { id: 1 })
  },
}
