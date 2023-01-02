import {
  IInputStudentTutoringEntity,
  IStudentTutoringEntity,
} from '@domain/entities/student-tutoring'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputSubscribeToTutoringDto = IInputStudentTutoringEntity

export type IOutputSubscribeToTutoringDto = Either<
  IError,
  IStudentTutoringEntity
>
