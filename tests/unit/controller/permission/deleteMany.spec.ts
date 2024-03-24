import { PermissionErrors } from '@business/module/errors/permissionErrors'
import { RolesErrors } from '@business/module/errors/rolesErrors'
import { IPermissionRepositoryToken } from '@business/repositories/permission/iPermissionRepository'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { DeletePermissionUseCase } from '@business/useCases/permission/deleteManyPermissionsUseCase'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { DeleteManyPermissionOperator } from '@controller/operations/permission/deleteMany'
import { InputDeletePermission } from '@controller/serializers/permission/delete'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeAuthorizer } from '@tests/mock/entities/fakeAuthorizerEntity'
import { FakePermissionRepository } from '@tests/mock/repositories/fakePermissionRepository'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'
import { FakeUniqueIdentifierService } from '@tests/mock/services/fakeUniqueIdentifierService'

describe('Delete Many Permissions Operator', () => {
  beforeAll(() => {
    container.bind(DeletePermissionUseCase).toSelf().inSingletonScope()
    container.bind(VerifyProfileUseCase).toSelf().inSingletonScope()
    container
      .bind(IPermissionRepositoryToken)
      .to(FakePermissionRepository)
      .inSingletonScope()
    container.bind(ILoggerServiceToken).to(FakeLoggerService).inSingletonScope()
    container
      .bind(IUniqueIdentifierServiceToken)
      .to(FakeUniqueIdentifierService)
      .inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  const input = new InputDeletePermission({
    ids: [1, 2, 3],
  })

  test('Should fail to delete many permissions if user isnt authorized', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => left(RolesErrors.notAllowed()))

    const sut = container.get(DeleteManyPermissionOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(RolesErrors.notAllowed())
  })

  test('Should fail to delete many permissions if permissions deletion failed', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => right(fakeAuthorizer))

    const deleteMany = container.get(DeletePermissionUseCase)
    jest
      .spyOn(deleteMany, 'exec')
      .mockImplementationOnce(async () => left(PermissionErrors.deleteFailed()))

    const sut = container.get(DeleteManyPermissionOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(PermissionErrors.deleteFailed())
  })

  test('Should have success to delete many permissions', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => right(fakeAuthorizer))

    const deleteMany = container.get(DeletePermissionUseCase)
    jest
      .spyOn(deleteMany, 'exec')
      .mockImplementationOnce(async () => right(void 0))

    const sut = container.get(DeleteManyPermissionOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })
})
