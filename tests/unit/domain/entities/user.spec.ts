import { UserEntity } from '@domain/entities/user'
import { fakeUserEntity } from '@tests/mock/entities/fakeUserEntity'

describe('User Entity', () => {
  describe('Create Method', () => {
    test('Should be able to create a new user', async () => {
      const userEntity = UserEntity.create(fakeUserEntity, new Date())

      expect(userEntity.isLeft()).toBeFalsy()
      expect(userEntity.isRight()).toBeTruthy()
    })
  })

  describe('Update Method', () => {
    test('Should be able to update a user', async () => {
      const userUpdate = {
        ...fakeUserEntity,
        name: 'new name',
        email: 'new_email@gmail.com',
      }

      const userUpdatedEntity = UserEntity.update(userUpdate, new Date())

      expect(userUpdatedEntity.isLeft()).toBeFalsy()
      expect(userUpdatedEntity.isRight()).toBeTruthy()
      expect(userUpdatedEntity.value.export().updated_at).not.toBe(
        fakeUserEntity.updated_at
      )
    })
  })
})
