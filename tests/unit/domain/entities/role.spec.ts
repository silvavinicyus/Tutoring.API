import { RoleEntity } from '@domain/entities/role'
import { fakeRoleEntity } from '@tests/mock/entities/fakeRoleEntity'

describe('Role Entity', () => {
  describe('Create Method', () => {
    test('Should be able to create a new role', async () => {
      const roleEntity = RoleEntity.create(fakeRoleEntity, new Date())

      expect(roleEntity.isLeft()).toBeFalsy()
      expect(roleEntity.isRight()).toBeTruthy()
    })
  })
})
