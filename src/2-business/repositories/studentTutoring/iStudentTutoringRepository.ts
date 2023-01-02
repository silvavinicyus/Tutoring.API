import { ITransaction } from '@business/dto/transaction/create'
import { IStudentTutoringEntity } from '@domain/entities/student-tutoring'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export const IStudentTutoringRepositoryToken = Symbol.for(
  'StudentTutoringRepositorySymbol'
)
export interface IStudentTutoringRepository {
  subscribe(
    props: IStudentTutoringEntity,
    trx?: ITransaction
  ): Promise<Either<IError, IStudentTutoringEntity>>
}
