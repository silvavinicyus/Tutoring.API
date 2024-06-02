import { IInputCreateManyRolePermissionsDto } from '@business/dto/rolePermission/createMany'
import { IInputDeleteManyRolePermissionDto } from '@business/dto/rolePermission/deleteMany'
import { RolePermissionErrors } from '@business/module/errors/rolePermissionErrors'
import { IRolePermissionRepositoryToken } from '@business/repositories/rolePermission/iRolePermissionRepository'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { CreateManyRolePermissionUseCase } from '@business/useCases/rolePermission/createMany'
import { DeleteManyRolePermissionsUseCase } from '@business/useCases/rolePermission/deleteMany'
import { container } from '@shared/ioc/container'
import { fakeRolePermissionEntity } from '@tests/mock/entities/fakeRolePermissionEntity'
import {
  FakeRolePermissionRepository,
  fakeRolePermissionRepositoryCreateMany,
  fakeRolePermissionRepositoryDeleteMany,
} from '@tests/mock/repositories/fakeRolePermissionRepository'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'
import { FakeUniqueIdentifierService } from '@tests/mock/services/fakeUniqueIdentifierService'

describe('Role Permission Use Cases', () => {
  beforeAll(() => {
    container
      .bind(IRolePermissionRepositoryToken)
      .to(FakeRolePermissionRepository)
    container.bind(ILoggerServiceToken).to(FakeLoggerService)
    container
      .bind(IUniqueIdentifierServiceToken)
      .to(FakeUniqueIdentifierService)
  })

  afterAll(() => {
    container.unbindAll()
  })

  describe('Create Many Role Permission Use Case', () => {
    const input: IInputCreateManyRolePermissionsDto = {
      permissions: [1, 2, 3, 4],
      role_id: 1,
    }

    test('Should fail to create many role permissions if repository failed', async () => {
      fakeRolePermissionRepositoryCreateMany.mockImplementationOnce(
        async () => {
          throw new Error()
        }
      )

      const sut = container.get(CreateManyRolePermissionUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(RolePermissionErrors.createManyError())
    })

    test('Should have success to create many role permission', async () => {
      fakeRolePermissionRepositoryCreateMany.mockImplementationOnce(
        async () => [fakeRolePermissionEntity]
      )

      const sut = container.get(CreateManyRolePermissionUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })

  describe('Delete Many Role Permission Use Case', () => {
    const input: IInputDeleteManyRolePermissionDto = {
      permissions: [1, 2, 3, 4, 5],
      role_id: 1,
    }

    test('Should fail to delete many role permissions if repository failed', async () => {
      fakeRolePermissionRepositoryDeleteMany.mockImplementationOnce(
        async () => {
          throw new Error()
        }
      )

      const sut = container.get(DeleteManyRolePermissionsUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(RolePermissionErrors.deleteManyError())
    })

    test('Should have success to delete many role permissions', async () => {
      fakeRolePermissionRepositoryDeleteMany.mockImplementationOnce(
        async () => void 0
      )

      const sut = container.get(DeleteManyRolePermissionsUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })
})
