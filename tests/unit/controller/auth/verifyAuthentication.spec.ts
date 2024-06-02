import { UserErrors } from '@business/module/errors/user'
import { IUserRepositoryToken } from '@business/repositories/user/iUserRepository'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { ITokenServiceToken } from '@business/services/token/iTokenService'
import { FindByUserUseCase } from '@business/useCases/user/findByUser'
import { VerifyAuthenticationOperator } from '@controller/operations/auth/verifyAuthentication'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeUserEntity } from '@tests/mock/entities/fakeUserEntity'
import { FakeUserRepository } from '@tests/mock/repositories/fakeUserRepository'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'
import {
  FakeTokenService,
  fakeTokenServiceVerify,
} from '@tests/mock/services/fakeTokenService'

describe('Verify Authentication operator', () => {
  beforeAll(() => {
    container.bind(FindByUserUseCase).toSelf().inSingletonScope()
    container
      .bind(IUserRepositoryToken)
      .to(FakeUserRepository)
      .inSingletonScope()
    container.bind(ITokenServiceToken).to(FakeTokenService).inSingletonScope()
    container.bind(ILoggerServiceToken).to(FakeLoggerService)
  })

  afterAll(() => {
    container.unbindAll()
  })

  beforeAll(async () => {
    fakeTokenServiceVerify.mockImplementation(() => ({
      user_uuid: 'user_uuid',
    }))
  })

  test('Should fail to verify authentication if user does not exists', async () => {
    const findBy = container.get(FindByUserUseCase)
    jest
      .spyOn(findBy, 'exec')
      .mockImplementationOnce(async () => left(UserErrors.notFound()))

    const sut = container.get(VerifyAuthenticationOperator)
    const result = await sut.run({ bearer: 'new_bearer' })

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(UserErrors.notFound())
  })

  test('Should have success to verify authentication', async () => {
    const findBy = container.get(FindByUserUseCase)
    jest
      .spyOn(findBy, 'exec')
      .mockImplementationOnce(async () => right(fakeUserEntity))

    const sut = container.get(VerifyAuthenticationOperator)
    const result = await sut.run({ bearer: 'new_bearer' })

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })
})
