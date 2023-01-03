import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputUnsubscribeToTutoringDto = {
  tutoring_id: number
  student_id: number
}

export type IOutputUnsubscribeToTutoringDto = Either<IError, void>
