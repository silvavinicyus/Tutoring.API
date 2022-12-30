import { ITutoringEntity } from '@domain/entities/tutoring'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputFindTutoringByUuidDto = {
  uuid: string
}

export type IOutputFindTutoringByUuidDto = Either<IError, ITutoringEntity>
