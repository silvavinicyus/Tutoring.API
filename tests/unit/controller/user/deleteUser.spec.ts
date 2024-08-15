import { UserErrors } from '@business/module/errors/user'
import { IUserRepositoryToken } from '@business/repositories/user/iUserRepository'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { DeleteUserUseCase } from '@business/useCases/user/deleteUser'
import { FindByUserUseCase } from '@business/useCases/user/findByUser'
import { DeleteUserOperator } from '@controller/operations/user/deleteUser'
import { InputDeleteUser } from '@controller/serializers/user/deleteUser'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeUserEntity } from '@tests/mock/entities/fakeUserEntity'
import { FakeUserRepository } from '@tests/mock/repositories/fakeUserRepository'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'

describe('Create or Update User Operator', () => {
  beforeAll(() => {
    container.bind(ILoggerServiceToken).to(FakeLoggerService)
    container.bind(DeleteUserUseCase).toSelf().inSingletonScope()
    container.bind(FindByUserUseCase).toSelf().inSingletonScope()
    container
      .bind(IUserRepositoryToken)
      .to(FakeUserRepository)
      .inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  const input = new InputDeleteUser({
    id: 1,
  })

  test('Should fail to delete user if find by failed', async () => {
    const findBy = container.get(FindByUserUseCase)

    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(Promise.resolve(left(UserErrors.notFound())))

    const sut = container.get(DeleteUserOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(UserErrors.notFound())
  })

  test('Should fail to delete user if delete user failed', async () => {
    const findBy = container.get(FindByUserUseCase)

    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(Promise.resolve(right(fakeUserEntity)))

    const deleteUser = container.get(DeleteUserUseCase)

    jest
      .spyOn(deleteUser, 'exec')
      .mockReturnValueOnce(Promise.resolve(left(UserErrors.deleteFailed())))

    const sut = container.get(DeleteUserOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(UserErrors.deleteFailed())
  })

  test('Should have success to delete a user', async () => {
    const findBy = container.get(FindByUserUseCase)

    jest
      .spyOn(findBy, 'exec')
      .mockReturnValueOnce(Promise.resolve(right(fakeUserEntity)))

    const deleteUser = container.get(DeleteUserUseCase)

    jest
      .spyOn(deleteUser, 'exec')
      .mockReturnValueOnce(Promise.resolve(right(void 0)))

    const sut = container.get(DeleteUserOperator)
    const result = await sut.run(input)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })
})
