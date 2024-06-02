import { PermissionEntity } from '@domain/entities/permission'
import { fakePermissionEntity } from '@tests/mock/entities/fakePermissionEntity'

describe('Permission Entity', () => {
  describe('Create Method', () => {
    test('Should be able to create a new permission', async () => {
      const permissionEntity = PermissionEntity.create(
        fakePermissionEntity,
        new Date()
      )

      expect(permissionEntity.isLeft()).toBeFalsy()
      expect(permissionEntity.isRight()).toBeTruthy()
    })
  })

  describe('Update Method', () => {
    test('Should be able to update a permission', async () => {
      const permissionUpdate = {
        ...fakePermissionEntity,
        name: 'new name',
        description: 'new description',
      }

      const permissionUpdatedEntity = PermissionEntity.update(permissionUpdate)

      expect(permissionUpdatedEntity.isLeft()).toBeFalsy()
      expect(permissionUpdatedEntity.isRight()).toBeTruthy()
      expect(permissionUpdatedEntity.value.export().updated_at).not.toBe(
        fakePermissionEntity.updated_at
      )
    })
  })
})
