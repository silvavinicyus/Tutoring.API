import { IInputStundentEntity, IStudentEntity } from '@domain/entities/student'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputCreateStudentDto = IInputStundentEntity

export type IOutputCreateStudentDto = Either<IError, Partial<IStudentEntity>>
