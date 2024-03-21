import { RolePermissionEntity } from '@domain/entities/rolePermission'
import { fakeRolePermissionEntity } from '@tests/mock/entities/fakeRolePermissionEntity'

describe('RolePermission Entity', () => {
  describe('Create Method', () => {
    test('Should be able to create a new rolePermission', async () => {
      const rolePermissionEntity = RolePermissionEntity.create(
        fakeRolePermissionEntity,
        new Date()
      )

      expect(rolePermissionEntity.isLeft()).toBeFalsy()
      expect(rolePermissionEntity.isRight()).toBeTruthy()
    })
  })
})
