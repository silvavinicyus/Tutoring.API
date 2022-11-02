import { IStudentEntity } from '@domain/entities/student'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputFindStudentByEmailDto = {
  email: string
}

export type IOutputFindStudentByEmailDto = Either<IError, IStudentEntity>
