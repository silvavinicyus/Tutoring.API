import { IInputDeleteManyRolePermissionDto } from '@business/dto/rolePermission/deleteMany'
import { ITransaction } from '@business/dto/transaction/create'
import { IRolePermissionEntity } from '@domain/entities/rolePermission'

export const IRolePermissionRepositoryToken = Symbol.for(
  'RolePermissionRepositorySymbol'
)

export interface IRolePermissionRepository {
  createMany(
    input: IRolePermissionEntity[],
    trx?: ITransaction
  ): Promise<IRolePermissionEntity[]>
  deleteMany(
    input: IInputDeleteManyRolePermissionDto,
    trx?: ITransaction
  ): Promise<void>
}
