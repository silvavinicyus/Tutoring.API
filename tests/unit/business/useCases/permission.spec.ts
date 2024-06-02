import { IInputCreateManyPermissionsDto } from '@business/dto/permission/createMany'
import { IInputDeleteManyPermissionsDto } from '@business/dto/permission/deleteMany'
import { IInputFindByPermissionDto } from '@business/dto/permission/findBy'
import { PermissionErrors } from '@business/module/errors/permissionErrors'
import {
  IInputUpdatePermission,
  IPermissionRepositoryToken,
} from '@business/repositories/permission/iPermissionRepository'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { CreateManyPermissionsUseCase } from '@business/useCases/permission/createManyPermissionsUseCase'
import { DeletePermissionUseCase } from '@business/useCases/permission/deleteManyPermissionsUseCase'
import { FindByPermissionUseCase } from '@business/useCases/permission/findByPermissionUseCase'
import { UpdatePermissionUseCase } from '@business/useCases/permission/updatePermissionUseCase'
import { container } from '@shared/ioc/container'
import { fakePermissionEntity } from '@tests/mock/entities/fakePermissionEntity'
import {
  FakePermissionRepository,
  fakePermissionRepositoryCreateMany,
  fakePermissionRepositoryDeleteMany,
  fakePermissionRepositoryFindBy,
  fakePermissionRepositoryUpdate,
} from '@tests/mock/repositories/fakePermissionRepository'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'
import { FakeUniqueIdentifierService } from '@tests/mock/services/fakeUniqueIdentifierService'

describe('Permission Use Cases', () => {
  beforeAll(() => {
    container.bind(IPermissionRepositoryToken).to(FakePermissionRepository)
    container.bind(ILoggerServiceToken).to(FakeLoggerService)
    container
      .bind(IUniqueIdentifierServiceToken)
      .to(FakeUniqueIdentifierService)
  })

  afterAll(() => {
    container.unbindAll()
  })

  describe('Create Many Permissions Use Case', () => {
    const input: IInputCreateManyPermissionsDto = [
      {
        name: 'new name',
        description: 'new description',
        permission_group: 'permissions',
      },
      {
        name: 'new name 1',
        description: 'new description 1',
        permission_group: 'permissions',
      },
    ]

    test('Should fail to create many permissions if repository failed', async () => {
      fakePermissionRepositoryCreateMany.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(CreateManyPermissionsUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(PermissionErrors.creationFailed())
    })

    test('Should have success to create many permissions', async () => {
      fakePermissionRepositoryCreateMany.mockImplementationOnce(async () => [
        fakePermissionEntity,
      ])

      const sut = container.get(CreateManyPermissionsUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })

  describe('Delete Many Permissions Use Case', () => {
    const input: IInputDeleteManyPermissionsDto = {
      ids: [1, 2, 3],
    }

    test('Should fail to delete many permissions if repository failed', async () => {
      fakePermissionRepositoryDeleteMany.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(DeletePermissionUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(PermissionErrors.deleteFailed())
    })

    test('Should have success to delete many permissions', async () => {
      fakePermissionRepositoryDeleteMany.mockImplementationOnce(
        async () => void 0
      )

      const sut = container.get(DeletePermissionUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })

  describe('Find By Permission Use Case', () => {
    const input: IInputFindByPermissionDto = {
      where: [
        {
          column: 'name',
          value: 'permission name',
        },
      ],
    }

    test('Should fail to find a permission if repository failed', async () => {
      fakePermissionRepositoryFindBy.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(FindByPermissionUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(PermissionErrors.internalError())
    })

    test('Should fail to find a permission if permission does not exists', async () => {
      fakePermissionRepositoryFindBy.mockImplementationOnce(
        async () => undefined
      )

      const sut = container.get(FindByPermissionUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(PermissionErrors.notFound())
    })

    test('Should have success to find a permission', async () => {
      fakePermissionRepositoryFindBy.mockImplementationOnce(
        async () => fakePermissionEntity
      )

      const sut = container.get(FindByPermissionUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })

  describe('Update Permission Use Case', () => {
    const input: IInputUpdatePermission = {
      newData: {
        description: 'new description',
        name: 'new new name',
      },
      updateWhere: {
        column: 'id',
        value: 1,
      },
    }

    test('Should fail to update a permission if repository failed', async () => {
      fakePermissionRepositoryUpdate.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(UpdatePermissionUseCase)
      const result = await sut.exec(input.newData, input.updateWhere)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(PermissionErrors.updateFailed())
    })

    test('Should have success to update a permission', async () => {
      fakePermissionRepositoryUpdate.mockImplementationOnce(
        async () => fakePermissionEntity
      )

      const sut = container.get(UpdatePermissionUseCase)
      const result = await sut.exec(input.newData, input.updateWhere)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })
})
