import { IInputFindMajorByUuidDto } from '@business/dto/major/findMajorByUuidDto'
import { ITransaction } from '@business/dto/transaction/create'
import { IMajorEntity } from '@domain/entities/major'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export const IMajorRepositoryToken = Symbol.for('MajorRepositorySymbol')

export interface IMajorRepository {
  create(
    props: IMajorEntity,
    trx?: ITransaction
  ): Promise<Either<IError, IMajorEntity>>

  findByUuid(
    props: IInputFindMajorByUuidDto
  ): Promise<Either<IError, IMajorEntity>>
}
