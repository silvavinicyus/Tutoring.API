import { IInputFindCourseByUuidDto } from '@business/dto/course/findCourseByUuidDto'
import { ITransaction } from '@business/dto/transaction/create'
import { ICourseEntity } from '@domain/entities/course'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export const ICourseRepositoryToken = Symbol.for('CourseRepositorySymbol')

export interface ICourseRepository {
  create(
    input: ICourseEntity,
    trx?: ITransaction
  ): Promise<Either<IError, ICourseEntity>>

  findByUuid(
    input: IInputFindCourseByUuidDto
  ): Promise<Either<IError, ICourseEntity>>
}
