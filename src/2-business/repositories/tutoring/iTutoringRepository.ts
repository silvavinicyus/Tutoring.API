import { ITransaction } from '@business/dto/transaction/create'
import { IInputFindTutoringByUuidDto } from '@business/dto/tutoring/findTutoringByUuidDto'
import { ITutoringEntity } from '@domain/entities/tutoring'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export const ITutoringRepositoryToken = Symbol.for('TutoringRepositorySymbol')

export interface ITutoringRepository {
  create(
    props: ITutoringEntity,
    trx?: ITransaction
  ): Promise<Either<IError, ITutoringEntity>>

  findByUuid(
    props: IInputFindTutoringByUuidDto
  ): Promise<Either<IError, ITutoringEntity>>
}
