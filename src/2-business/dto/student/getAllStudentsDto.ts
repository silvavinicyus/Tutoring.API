import { IStudentEntity } from '@domain/entities/student'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'
import { IPaginatedResponse } from '../useCaseOptions'

export type IInputGetAllStudentsDto = {
  page?: number
  limit?: number
}

export type IOutputGetAllStudents = Either<
  IError,
  IPaginatedResponse<IStudentEntity>
>
