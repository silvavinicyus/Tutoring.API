import { ITransaction } from '@business/dto/transaction/create'
import { IStudentEntity } from '@domain/entities/student'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export const IStudentRepositoryToken = Symbol.for('CourseRepositorySymbol')
export interface IStudentRepository {
  create(
    props: IStudentEntity,
    trx?: ITransaction
  ): Promise<Either<IError, IStudentEntity>>
}
