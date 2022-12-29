import {
  IInputTutoringEntity,
  ITutoringEntity,
} from '@domain/entities/tutoring'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputCreateTutoringDto = IInputTutoringEntity

export type IOutputCreateTutoringDto = Either<IError, ITutoringEntity>
