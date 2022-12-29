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

    await queryInterface.bulkInsert('student_history', [
      {
        id: 1,
        uuid: v4(),
        name: 'Vinicyus Silva',
        cpf: '12248498977',
        device_token: 'device_token1',
        email: 'vinicyus@gmail.com',
        password,
        major_id: 1,
        period: 8,
        role_id: 1,
        records_url: 'record_url',
        registration_number: '18185512',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ])
  },

  down: async (
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) => {
    await queryInterface.bulkDelete('student_history', { id: 1 })
  },
}
