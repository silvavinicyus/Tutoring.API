import { UserErrors } from '@business/module/errors/user'
import { IUserRepositoryToken } from '@business/repositories/user/iUserRepository'
import { IEncryptionServiceToken } from '@business/services/encryption/iEncryption'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { CreateUserUseCase } from '@business/useCases/user/createUser'
import { FindByUserUseCase } from '@business/useCases/user/findByUser'
import { UpdateUserUseCase } from '@business/useCases/user/updateUser'
import { CreateOrUpdateUserOperator } from '@controller/operations/user/createOrUpdate'
import { InputCreateUser } from '@controller/serializers/user/createUser'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeUserEntity } from '@tests/mock/entities/fakeUserEntity'
import { FakeUserRepository } from '@tests/mock/repositories/fakeUserRepository'
import {
  FakeEncryptionService,
  fakeEncryptionServiceCreatePasswordHash,
} from '@tests/mock/services/fakeEncryptionService'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'
import { FakeUniqueIdentifierService } from '@tests/mock/services/fakeUniqueIdentifierService'

describe('Create or Update User Operator', () => {
  beforeAll(() => {
    container
      .bind(IUniqueIdentifierServiceToken)
      .to(FakeUniqueIdentifierService)
      .inSingletonScope()
    container.bind(ILoggerServiceToken).to(FakeLoggerService)
    container.bind(CreateUserUseCase).toSelf().inSingletonScope()
    container.bind(FindByUserUseCase).toSelf().inSingletonScope()
    container.bind(UpdateUserUseCase).toSelf().inSingletonScope()
    container
      .bind(IUserRepositoryToken)
      .to(FakeUserRepository)
      .inSingletonScope()
    container
      .bind(IEncryptionServiceToken)
      .to(FakeEncryptionService)
      .inSingletonScope()
  })

  beforeAll(() => {
    fakeEncryptionServiceCreatePasswordHash.mockImplementation(
      async () => 'aksjdalskdj'
    )
  })

  afterAll(() => {
    container.unbindAll()
  })

  const input = new InputCreateUser({
    birthdate: new Date(),
    email: 'email@gmail.com',
    name: 'new name',
    password: 'new password',
    phone: '82 981494949',
    role_id: 1,
    user_real_id: 1,
    user_real_uuid: 'ccaddbfd-db88-471f-91ae-4aa04609facb',
  })

  test('Should fail to create a user if create user failed', async () => {
    const findByUseCase = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUseCase, 'exec')
      .mockImplementationOnce(async () => left(UserErrors.notFound()))

    const createUser = container.get(CreateUserUseCase)
    jest
      .spyOn(createUser, 'exec')
      .mockImplementationOnce(async () => left(UserErrors.creationError()))

    const sut = container.get(CreateOrUpdateUserOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(UserErrors.creationError())
  })

  test('Should fail to update a user if find user failed', async () => {
    const findByUseCase = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUseCase, 'exec')
      .mockImplementationOnce(async () => left(UserErrors.loadFailed()))

    const sut = container.get(CreateOrUpdateUserOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(UserErrors.loadFailed())
  })

  test('Should fail to update a user if update failed', async () => {
    const findByUseCase = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUseCase, 'exec')
      .mockImplementationOnce(async () => right(fakeUserEntity))

    const updateUser = container.get(UpdateUserUseCase)
    jest
      .spyOn(updateUser, 'exec')
      .mockImplementationOnce(async () => left(UserErrors.updateError()))

    const sut = container.get(CreateOrUpdateUserOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(UserErrors.updateError())
  })

  test('Should have success to update a user', async () => {
    const findByUseCase = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUseCase, 'exec')
      .mockImplementationOnce(async () => right(fakeUserEntity))

    const updateUser = container.get(UpdateUserUseCase)
    jest
      .spyOn(updateUser, 'exec')
      .mockImplementationOnce(async () => right(fakeUserEntity))

    const sut = container.get(CreateOrUpdateUserOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })

  test('Should have success to create a user', async () => {
    const findByUseCase = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUseCase, 'exec')
      .mockImplementationOnce(async () => left(UserErrors.notFound()))

    const createUser = container.get(CreateUserUseCase)
    jest
      .spyOn(createUser, 'exec')
      .mockImplementationOnce(async () => right(fakeUserEntity))

    const sut = container.get(CreateOrUpdateUserOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })
})
