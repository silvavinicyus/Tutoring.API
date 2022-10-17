import { IStudentEntity } from '@domain/entities/student'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputFindStudentByUuidDto = {
  uuid: string
}

export type IOutputFindStudentByUuidDto = Either<IError, IStudentEntity>
