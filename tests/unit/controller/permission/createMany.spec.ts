import { PermissionErrors } from '@business/module/errors/permissionErrors'
import { RolesErrors } from '@business/module/errors/rolesErrors'
import { IPermissionRepositoryToken } from '@business/repositories/permission/iPermissionRepository'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { CreateManyPermissionsUseCase } from '@business/useCases/permission/createManyPermissionsUseCase'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { CreateManyPermissionsOperator } from '@controller/operations/permission/createMany'
import {
  InputCreateManyPermissions,
  InputCreatePermission,
} from '@controller/serializers/permission/create'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeAuthorizer } from '@tests/mock/entities/fakeAuthorizerEntity'
import { fakePermissionEntity } from '@tests/mock/entities/fakePermissionEntity'
import { FakePermissionRepository } from '@tests/mock/repositories/fakePermissionRepository'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'
import { FakeUniqueIdentifierService } from '@tests/mock/services/fakeUniqueIdentifierService'

describe('Create Many Permissions Operator', () => {
  beforeAll(() => {
    container.bind(CreateManyPermissionsUseCase).toSelf().inSingletonScope()
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

  const input = new InputCreateManyPermissions({
    permissions: [
      new InputCreatePermission({
        description: 'new description',
        name: 'new name',
        permission_group: 'permissions',
      }),
    ],
  })

  test('Should fail to create many permissions if user isnt authorized', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => left(RolesErrors.notAllowed()))

    const sut = container.get(CreateManyPermissionsOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(RolesErrors.notAllowed())
  })

  test('Should fail to create many permissions if permissions creations failed', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => right(fakeAuthorizer))

    const createMany = container.get(CreateManyPermissionsUseCase)
    jest
      .spyOn(createMany, 'exec')
      .mockImplementationOnce(async () =>
        left(PermissionErrors.creationFailed())
      )

    const sut = container.get(CreateManyPermissionsOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(PermissionErrors.creationFailed())
  })

  test('Should have success to create many permissions', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => right(fakeAuthorizer))

    const createMany = container.get(CreateManyPermissionsUseCase)
    jest
      .spyOn(createMany, 'exec')
      .mockImplementationOnce(async () => right([fakePermissionEntity]))

    const sut = container.get(CreateManyPermissionsOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })
})
