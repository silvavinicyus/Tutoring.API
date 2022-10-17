import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputDeleteStudentDto = {
  id: number
}

export type IOutputDeleteStudentDto = Either<IError, void>
