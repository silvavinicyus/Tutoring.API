import { ITransaction } from '@business/dto/transaction/create'
import { IRoleEntity } from '@domain/entities/role'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export const IRoleRepositoryToken = Symbol.for('RoleRepositorySymbol')

export interface IRoleRepository {
  create(
    props: IRoleEntity,
    trx?: ITransaction
  ): Promise<Either<IError, IRoleEntity>>
}
