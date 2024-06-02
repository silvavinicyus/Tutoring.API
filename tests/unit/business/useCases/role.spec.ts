import { IInputVerifyProfileDto } from '@business/dto/role/authorize'
import { IInputCreateRoleDto } from '@business/dto/role/createRole'
import { RolesErrors } from '@business/module/errors/rolesErrors'
import { IRoleRepositoryToken } from '@business/repositories/role/iRoleRepository'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { CreateRoleUseCase } from '@business/useCases/role/createRole'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { container } from '@shared/ioc/container'
import { fakeAuthorizer } from '@tests/mock/entities/fakeAuthorizerEntity'
import { fakeRoleEntity } from '@tests/mock/entities/fakeRoleEntity'
import {
  FakeRoleRepository,
  fakeRoleRepositoryCreate,
} from '@tests/mock/repositories/fakeRoleRepository'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'
import { FakeUniqueIdentifierService } from '@tests/mock/services/fakeUniqueIdentifierService'

describe('Role Use Cases', () => {
  beforeAll(() => {
    container.bind(IRoleRepositoryToken).to(FakeRoleRepository)
    container.bind(ILoggerServiceToken).to(FakeLoggerService)
    container
      .bind(IUniqueIdentifierServiceToken)
      .to(FakeUniqueIdentifierService)
  })

  afterAll(() => {
    container.unbindAll()
  })

  describe('Create Role Use Case', () => {
    const input: IInputCreateRoleDto = {
      description: 'new description',
      name: 'new name',
    }

    test('Should fail to create a role if repository failed', async () => {
      fakeRoleRepositoryCreate.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(CreateRoleUseCase)
      const reult = await sut.exec(input)

      expect(reult.isLeft()).toBeTruthy()
      expect(reult.isRight()).toBeFalsy()
      expect(reult.value).toEqual(RolesErrors.creationError())
    })

    test('Should have success to create a role', async () => {
      fakeRoleRepositoryCreate.mockImplementationOnce(
        async () => fakeRoleEntity
      )

      const sut = container.get(CreateRoleUseCase)
      const reult = await sut.exec(input)

      expect(reult.isLeft()).toBeFalsy()
      expect(reult.isRight()).toBeTruthy()
    })
  })

  describe('Verify Profile Use Case', () => {
    test('Should return not allowed if user aint authorized', async () => {
      const input: IInputVerifyProfileDto = {
        permissions: ['fake_permission'],
        user: fakeAuthorizer,
      }

      const sut = container.get(VerifyProfileUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(RolesErrors.notAllowed())
    })

    test('Should return allowed if user is authorized', async () => {
      const input: IInputVerifyProfileDto = {
        permissions: ['permissions'],
        user: fakeAuthorizer,
      }

      const sut = container.get(VerifyProfileUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })
})
