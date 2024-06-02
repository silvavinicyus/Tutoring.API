import { IInputCreateUserDto } from '@business/dto/user/create'
import { IInputDeleteUserDto } from '@business/dto/user/delete'
import { IInputFindUserByDto } from '@business/dto/user/findBy'
import { IInputUpdateUserDto } from '@business/dto/user/update'
import { UserErrors } from '@business/module/errors/user'
import { IUserRepositoryToken } from '@business/repositories/user/iUserRepository'
import { IEncryptionServiceToken } from '@business/services/encryption/iEncryption'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { CreateUserUseCase } from '@business/useCases/user/createUser'
import { DeleteUserUseCase } from '@business/useCases/user/deleteUser'
import { FindByUserUseCase } from '@business/useCases/user/findByUser'
import { UpdateUserUseCase } from '@business/useCases/user/updateUser'
import { container } from '@shared/ioc/container'
import { fakeUserEntity } from '@tests/mock/entities/fakeUserEntity'
import {
  FakeUserRepository,
  fakeUserRepositoryCreate,
  fakeUserRepositoryDelete,
  fakeUserRepositoryFindBy,
  fakeUserRepositoryUpdate,
} from '@tests/mock/repositories/fakeUserRepository'
import {
  FakeEncryptionService,
  fakeEncryptionServiceCreatePasswordHash,
} from '@tests/mock/services/fakeEncryptionService'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'
import { FakeUniqueIdentifierService } from '@tests/mock/services/fakeUniqueIdentifierService'

describe('User Use Cases', () => {
  beforeAll(() => {
    container.bind(ILoggerServiceToken).to(FakeLoggerService)
    container
      .bind(IUniqueIdentifierServiceToken)
      .to(FakeUniqueIdentifierService)
    container.bind(IUserRepositoryToken).to(FakeUserRepository)
    container.bind(IEncryptionServiceToken).to(FakeEncryptionService)
  })

  beforeEach(() => {
    fakeEncryptionServiceCreatePasswordHash.mockReturnValueOnce(
      Promise.resolve('encrypted_password')
    )
  })

  afterAll(() => {
    container.unbindAll()
  })

  describe('Create User use case', () => {
    test('Should fail to create a new user if repository failed', async () => {
      const input: IInputCreateUserDto = { ...fakeUserEntity }

      fakeUserRepositoryCreate.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(CreateUserUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(UserErrors.creationError())
    })

    test('Should have success to create a new user', async () => {
      const input: IInputCreateUserDto = { ...fakeUserEntity }

      fakeUserRepositoryCreate.mockImplementationOnce(
        async () => fakeUserEntity
      )

      const sut = container.get(CreateUserUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })

  describe('Delete User use case', () => {
    const input: IInputDeleteUserDto = {
      id: 1,
    }

    test('Should fail to delete a user if repository failed', async () => {
      fakeUserRepositoryDelete.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(DeleteUserUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(UserErrors.deleteFailed())
    })

    test('Should have success to delete a user', async () => {
      fakeUserRepositoryDelete.mockImplementationOnce(async () => void 0)

      const sut = container.get(DeleteUserUseCase)
      const result = await sut.exec(input)

      expect(result.isRight()).toBeTruthy()
      expect(result.isLeft()).toBeFalsy()
    })
  })

  describe('FindBy User use case', () => {
    const input: IInputFindUserByDto = {
      where: [
        {
          column: 'id',
          value: 1,
        },
      ],
    }

    test('Should fail to find a user if repository failed', async () => {
      fakeUserRepositoryFindBy.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(FindByUserUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(UserErrors.loadFailed())
    })

    test('Should fail to find a user if user does not exists', async () => {
      fakeUserRepositoryFindBy.mockImplementationOnce(async () => void 0)

      const sut = container.get(FindByUserUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(UserErrors.notFound())
    })

    test('Should fail to find a user if repository failed', async () => {
      fakeUserRepositoryFindBy.mockImplementationOnce(
        async () => fakeUserEntity
      )

      const sut = container.get(FindByUserUseCase)
      const result = await sut.exec(input)

      expect(result.isRight()).toBeTruthy()
      expect(result.isLeft()).toBeFalsy()
    })
  })

  describe('Update User use case', () => {
    const input: IInputUpdateUserDto = {
      email: 'fake_email@gmail.com',
      name: 'fake new name',
      user_real_id: 1,
      user_real_uuid: 'fake uuid',
    }

    test('Should fail to update user if repository failed', async () => {
      fakeUserRepositoryUpdate.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(UpdateUserUseCase)
      const result = await sut.exec(input, {
        column: 'id',
        value: 1,
      })

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(UserErrors.updateError())
    })

    test('Should have success to update user', async () => {
      fakeUserRepositoryUpdate.mockImplementationOnce(
        async () => fakeUserEntity
      )

      const sut = container.get(UpdateUserUseCase)
      const result = await sut.exec(input, {
        column: 'id',
        value: 1,
      })

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })
})
