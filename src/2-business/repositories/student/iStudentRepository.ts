import { IInputDeleteStudentDto } from '@business/dto/student/deleteStudentDto'
import { IInputFindStudentByUuidDto } from '@business/dto/student/findStudentByUuidDto'
import { ITransaction } from '@business/dto/transaction/create'
import { IPaginatedResponse } from '@business/dto/useCaseOptions'
import { IStudentEntity } from '@domain/entities/student'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export const IStudentRepositoryToken = Symbol.for('CourseRepositorySymbol')
export interface IStudentRepository {
  create(
    props: IStudentEntity,
    trx?: ITransaction
  ): Promise<Either<IError, IStudentEntity>>

  findByUuid(
    props: IInputFindStudentByUuidDto
  ): Promise<Either<IError, IStudentEntity>>

  delete(
    props: IInputDeleteStudentDto,
    trx?: ITransaction
  ): Promise<Either<IError, void>>

  getAll(
    page: number,
    limit: number
  ): Promise<Either<IError, IPaginatedResponse<IStudentEntity>>>

  update(
    props: IStudentEntity,
    trx?: ITransaction
  ): Promise<Either<IError, IStudentEntity>>
}
