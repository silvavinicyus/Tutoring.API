import { IInputUserEntity, IUserEntity } from '@domain/entities/user'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputCreateUserDto = IInputUserEntity

export type IOutputCreateUserDto = Either<IError, IUserEntity>
