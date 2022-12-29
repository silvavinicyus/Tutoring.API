import { IStudentEntity } from '@domain/entities/student'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

type IAuthenticateOutput = {
  student: Partial<IStudentEntity>
  token: string
}

export type IInputAuthenticateDto = {
  student: IStudentEntity
  password: string
}

export type IOutputAuthenticateDto = Either<IError, IAuthenticateOutput>
