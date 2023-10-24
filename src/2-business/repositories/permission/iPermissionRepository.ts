import { IInputDeleteManyPermissionsDto } from '@business/dto/permission/deleteMany'
import { IInputFindByPermissionDto } from '@business/dto/permission/findBy'
import { IInputUpdatePermissionDto } from '@business/dto/permission/update'
import { ITransaction } from '@business/dto/transaction/create'
import {
  IPermissionEntity,
  PermissionEntityKeys,
} from '@domain/entities/permission'
import { IWhere } from '../where'

export const IPermissionRepositoryToken = Symbol.for(
  'IPermissionRepositoryToken'
)

export type updateWherePermission = IWhere<
  keyof PermissionEntityKeys,
  string | number
>

export interface IInputUpdatePermission {
  updateWhere: updateWherePermission
  newData: IInputUpdatePermissionDto
}

export interface IPermissionRepository {
  createMany(
    props: IPermissionEntity[],
    trx?: ITransaction
  ): Promise<IPermissionEntity[]>
  deleteMany(
    props: IInputDeleteManyPermissionsDto,
    trx?: ITransaction
  ): Promise<void>
  findBy(props: IInputFindByPermissionDto): Promise<IPermissionEntity>
  update(
    props: IInputUpdatePermission,
    trx?: ITransaction
  ): Promise<Partial<IPermissionEntity>>
}
