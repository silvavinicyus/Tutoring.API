import { IMajorEntity } from '@domain/entities/major'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputFindMajorByUuidDto = {
  uuid: string
}

export type IOutputFindMajorByUuidDto = Either<IError, IMajorEntity>
