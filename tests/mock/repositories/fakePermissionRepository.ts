import { IInputDeleteManyPermissionsDto } from '@business/dto/permission/deleteMany'
import { IInputFindByPermissionDto } from '@business/dto/permission/findBy'
import {
  IInputUpdatePermission,
  IPermissionRepository,
} from '@business/repositories/permission/iPermissionRepository'
import { IPermissionEntity } from '@domain/entities/permission'
import { injectable } from 'inversify'

@injectable()
export class FakePermissionRepository implements IPermissionRepository {
  createMany(_props: IPermissionEntity[]): Promise<IPermissionEntity[]> {
    return void 0
  }
  deleteMany(_props: IInputDeleteManyPermissionsDto): Promise<void> {
    return void 0
  }
  findBy(_props: IInputFindByPermissionDto): Promise<IPermissionEntity> {
    return void 0
  }
  update(_props: IInputUpdatePermission): Promise<Partial<IPermissionEntity>> {
    return void 0
  }
}

export const fakePermissionRepositoryFindBy = jest.spyOn(
  FakePermissionRepository.prototype,
  'findBy'
)

export const fakePermissionRepositoryUpdate = jest.spyOn(
  FakePermissionRepository.prototype,
  'update'
)

export const fakePermissionRepositoryCreateMany = jest.spyOn(
  FakePermissionRepository.prototype,
  'createMany'
)

export const fakePermissionRepositoryDeleteMany = jest.spyOn(
  FakePermissionRepository.prototype,
  'deleteMany'
)
