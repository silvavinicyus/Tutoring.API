import { RolesErrors } from '@business/module/errors/rolesErrors'
import { IRoleRepositoryToken } from '@business/repositories/role/iRoleRepository'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { CreateRoleUseCase } from '@business/useCases/role/createRole'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { CreateRoleOperator } from '@controller/operations/role/createRole'
import { InputCreateRole } from '@controller/serializers/role/createRole'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeAuthorizer } from '@tests/mock/entities/fakeAuthorizerEntity'
import { fakeRoleEntity } from '@tests/mock/entities/fakeRoleEntity'
import { FakeRoleRepository } from '@tests/mock/repositories/fakeRoleRepository'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'
import { FakeUniqueIdentifierService } from '@tests/mock/services/fakeUniqueIdentifierService'

describe('Add permissions to role operator', () => {
  beforeAll(() => {
    container.bind(CreateRoleUseCase).toSelf().inSingletonScope()
    container
      .bind(IRoleRepositoryToken)
      .to(FakeRoleRepository)
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

  const input = new InputCreateRole({
    description: 'new description',
    name: 'new name',
  })

  test('Should fail to create a role if user isnt authorized', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => left(RolesErrors.notAllowed()))

    const sut = container.get(CreateRoleOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(RolesErrors.notAllowed())
  })

  test('Should fail to create a role if role creation failed', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => right(fakeAuthorizer))

    const createRole = container.get(CreateRoleUseCase)
    jest
      .spyOn(createRole, 'exec')
      .mockImplementationOnce(async () => left(RolesErrors.creationError()))

    const sut = container.get(CreateRoleOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(RolesErrors.creationError())
  })

  test('Should have success to create a role', async () => {
    const verifyProfile = container.get(VerifyProfileUseCase)
    jest
      .spyOn(verifyProfile, 'exec')
      .mockImplementationOnce(async () => right(fakeAuthorizer))

    const createRole = container.get(CreateRoleUseCase)
    jest
      .spyOn(createRole, 'exec')
      .mockImplementationOnce(async () => right(fakeRoleEntity))

    const sut = container.get(CreateRoleOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })
})
