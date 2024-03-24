import { PermissionErrors } from '@business/module/errors/permissionErrors'
import { RolesErrors } from '@business/module/errors/rolesErrors'
import { IPermissionRepositoryToken } from '@business/repositories/permission/iPermissionRepository'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { FindByPermissionUseCase } from '@business/useCases/permission/findByPermissionUseCase'
import { UpdatePermissionUseCase } from '@business/useCases/permission/updatePermissionUseCase'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { UpdatePermissionOperator } from '@controller/operations/permission/update'
import { InputUpdatePermission } from '@controller/serializers/permission/update'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeAuthorizer } from '@tests/mock/entities/fakeAuthorizerEntity'
import { fakePermissionEntity } from '@tests/mock/entities/fakePermissionEntity'
import { FakePermissionRepository } from '@tests/mock/repositories/fakePermissionRepository'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'

describe('Update Permission Operator', () => {
  beforeAll(() => {
    container.bind(FindByPermissionUseCase).toSelf().inSingletonScope()
    container.bind(UpdatePermissionUseCase).toSelf().inSingletonScope()
    container.bind(VerifyProfileUseCase).toSelf().inSingletonScope()
    container
      .bind(IPermissionRepositoryToken)
      .to(FakePermissionRepository)
      .inSingletonScope()
    container.bind(ILoggerServiceToken).to(FakeLoggerService).inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  const input = new InputUpdatePermission({
    description: 'new decription',
    permission_group: 'decription',
    uuid: 'ccaddbfd-db88-471f-91ae-4aa04609facb',
  })

  test('Should fail to update a permission if user isnt authorized', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => left(RolesErrors.notAllowed()))

    const sut = container.get(UpdatePermissionOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(RolesErrors.notAllowed())
  })

  test('Should fail to update a permission if permission does not exists', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => right(fakeAuthorizer))

    const findByPermission = container.get(FindByPermissionUseCase)
    jest
      .spyOn(findByPermission, 'exec')
      .mockImplementationOnce(async () => left(PermissionErrors.notFound()))

    const sut = container.get(UpdatePermissionOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(PermissionErrors.notFound())
  })

  test('Should fail to update a permission if permission update failed', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => right(fakeAuthorizer))

    const findByPermission = container.get(FindByPermissionUseCase)
    jest
      .spyOn(findByPermission, 'exec')
      .mockImplementationOnce(async () => right(fakePermissionEntity))

    const updatePermission = container.get(UpdatePermissionUseCase)
    jest
      .spyOn(updatePermission, 'exec')
      .mockImplementationOnce(async () => left(PermissionErrors.updateFailed()))

    const sut = container.get(UpdatePermissionOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(PermissionErrors.updateFailed())
  })

  test('Should have success to update a permission', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => right(fakeAuthorizer))

    const findByPermission = container.get(FindByPermissionUseCase)
    jest
      .spyOn(findByPermission, 'exec')
      .mockImplementationOnce(async () => right(fakePermissionEntity))

    const updatePermission = container.get(UpdatePermissionUseCase)
    jest
      .spyOn(updatePermission, 'exec')
      .mockImplementationOnce(async () => right(fakePermissionEntity))

    const sut = container.get(UpdatePermissionOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })
})
