import { ITransaction } from '@business/dto/transaction/create'
import { IRoleEntity } from '@domain/entities/role'

export const IRoleRepositoryToken = Symbol.for('RoleRepositorySymbol')

export interface IRoleRepository {
  create(props: IRoleEntity, trx?: ITransaction): Promise<IRoleEntity>
}
