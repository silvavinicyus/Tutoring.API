import { IInputMajorEntity, IMajorEntity } from '@domain/entities/major'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputCreateMajorDto = IInputMajorEntity

export type IOutputCreateMajorDto = Either<IError, IMajorEntity>
