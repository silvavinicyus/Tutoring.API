'use strict'

const { v4 } = require('uuid')

const STUDENT = 'student_role'
const TUTOR = 'tutor_role'
const ADMIN = 'admin_role'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) => {
    await queryInterface.bulkInsert('roles', [
      {
        id: 1,
        uuid: v4(),
        name: ADMIN,
        description: 'Admin role',
        created_at: new Date(),
      },
      {
        id: 2,
        uuid: v4(),
        name: TUTOR,
        description: 'Tutor role',
        created_at: new Date(),
      },
      {
        id: 3,
        uuid: v4(),
        name: STUDENT,
        description: 'Student role',
        created_at: new Date(),
      },
    ])
  },

  down: async (
    /** @type {import('sequelize').QueryInterface} */ queryInterface,
    _Sequelize
  ) => {
    await queryInterface.bulkDelete('roles', { name: ADMIN })
    await queryInterface.bulkDelete('roles', { name: TUTOR })
    await queryInterface.bulkDelete('roles', { name: STUDENT })
  },
}
