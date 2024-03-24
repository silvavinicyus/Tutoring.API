import { RolePermissionErrors } from '@business/module/errors/rolePermissionErrors'
import { RolesErrors } from '@business/module/errors/rolesErrors'
import { IRolePermissionRepositoryToken } from '@business/repositories/rolePermission/iRolePermissionRepository'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { CreateManyRolePermissionUseCase } from '@business/useCases/rolePermission/createMany'
import { AddPermissionsToRoleOperator } from '@controller/operations/role/addPermissionsToRole'
import { InputAddPermissionsToRole } from '@controller/serializers/role/addPermissionsToRole'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeAuthorizer } from '@tests/mock/entities/fakeAuthorizerEntity'
import { fakeRolePermissionEntity } from '@tests/mock/entities/fakeRolePermissionEntity'
import { FakeRolePermissionRepository } from '@tests/mock/repositories/fakeRolePermissionRepository'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'
import { FakeUniqueIdentifierService } from '@tests/mock/services/fakeUniqueIdentifierService'

describe('Add permissions to role operator', () => {
  beforeAll(() => {
    container.bind(CreateManyRolePermissionUseCase).toSelf().inSingletonScope()
    container
      .bind(IRolePermissionRepositoryToken)
      .to(FakeRolePermissionRepository)
      .inSingletonScope()
    container
      .bind(IUniqueIdentifierServiceToken)
      .to(FakeUniqueIdentifierService)
      .inSingletonScope()
    container.bind(ILoggerServiceToken).to(FakeLoggerService).inSingletonScope()
    container.bind(VerifyProfileUseCase).toSelf().inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  const input = new InputAddPermissionsToRole({
    permissions: [1, 2, 3],
    role_id: 1,
  })

  test('Should fail to add permissions to a role if user isnt authorized', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => left(RolesErrors.notAllowed()))

    const sut = container.get(AddPermissionsToRoleOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(RolesErrors.notAllowed())
  })

  test('Should fail to add permissions to a role if add operation failed', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => right(fakeAuthorizer))

    const createManyRolePermissions = container.get(
      CreateManyRolePermissionUseCase
    )
    jest
      .spyOn(createManyRolePermissions, 'exec')
      .mockImplementationOnce(async () =>
        left(RolePermissionErrors.createManyError())
      )

    const sut = container.get(AddPermissionsToRoleOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(RolePermissionErrors.createManyError())
  })

  test('Should have success to create a role', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => right(fakeAuthorizer))

    const createManyRolePermissions = container.get(
      CreateManyRolePermissionUseCase
    )
    jest
      .spyOn(createManyRolePermissions, 'exec')
      .mockImplementationOnce(async () => right([fakeRolePermissionEntity]))

    const sut = container.get(AddPermissionsToRoleOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })
})
