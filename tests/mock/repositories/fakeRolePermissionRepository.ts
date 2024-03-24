import { IInputDeleteManyRolePermissionDto } from '@business/dto/rolePermission/deleteMany'
import { IRolePermissionRepository } from '@business/repositories/rolePermission/iRolePermissionRepository'
import { IRolePermissionEntity } from '@domain/entities/rolePermission'
import { injectable } from 'inversify'

@injectable()
export class FakeRolePermissionRepository implements IRolePermissionRepository {
  createMany(
    _input: IRolePermissionEntity[]
  ): Promise<IRolePermissionEntity[]> {
    return void 0
  }
  deleteMany(_input: IInputDeleteManyRolePermissionDto): Promise<void> {
    return void 0
  }
}

export const fakeRolePermissionRepositoryCreateMany = jest.spyOn(
  FakeRolePermissionRepository.prototype,
  'createMany'
)

export const fakeRolePermissionRepositoryDeleteMany = jest.spyOn(
  FakeRolePermissionRepository.prototype,
  'deleteMany'
)
