import { AuthErrors } from '@business/module/errors/authErrors'
import { IUserRepositoryToken } from '@business/repositories/user/iUserRepository'
import { IEncryptionServiceToken } from '@business/services/encryption/iEncryption'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { AuthenticateUseCase } from '@business/useCases/auth/authenticate'
import { FindByUserUseCase } from '@business/useCases/user/findByUser'
import { AuthenticateOperator } from '@controller/operations/auth/authenticate'
import { InputAuthenticate } from '@controller/serializers/auth/authenticate'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeUserEntity } from '@tests/mock/entities/fakeUserEntity'
import { FakeUserRepository } from '@tests/mock/repositories/fakeUserRepository'
import { FakeEncryptionService } from '@tests/mock/services/fakeEncryptionService'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'

describe('Authenticate Operator', () => {
  beforeAll(() => {
    container.bind(FindByUserUseCase).toSelf().inSingletonScope()
    container
      .bind(IUserRepositoryToken)
      .to(FakeUserRepository)
      .inSingletonScope()
    container.bind(AuthenticateUseCase).toSelf().inSingletonScope()
    container.bind(ILoggerServiceToken).to(FakeLoggerService).inSingletonScope()
    container
      .bind(IEncryptionServiceToken)
      .to(FakeEncryptionService)
      .inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  test('Should fail to authenticate a user if user does not exists', async () => {
    const input = new InputAuthenticate({
      password: 'password',
      email: 'email@gmail.com',
    })

    const findByUser = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUser, 'exec')
      .mockImplementationOnce(async () => left(AuthErrors.notAllowed()))

    const sut = container.get(AuthenticateOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(AuthErrors.notAllowed())
  })

  test('Should fail to authenticate a user if authentication failed', async () => {
    const input = new InputAuthenticate({
      password: 'password',
      email: 'email@gmail.com',
    })

    const findByUser = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUser, 'exec')
      .mockImplementationOnce(async () => right(fakeUserEntity))

    const authenticate = container.get(AuthenticateUseCase)
    jest
      .spyOn(authenticate, 'exec')
      .mockImplementationOnce(async () => left(AuthErrors.notAllowed()))

    const sut = container.get(AuthenticateOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(AuthErrors.notAllowed())
  })

  test('Should have success to authenticate a user', async () => {
    const input = new InputAuthenticate({
      password: 'password',
      email: 'email@gmail.com',
    })

    const findByUser = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUser, 'exec')
      .mockImplementationOnce(async () => right(fakeUserEntity))

    const authenticate = container.get(AuthenticateUseCase)
    jest
      .spyOn(authenticate, 'exec')
      .mockImplementationOnce(async () =>
        right({ user: {}, token: 'nre_token' })
      )

    const sut = container.get(AuthenticateOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })
})
