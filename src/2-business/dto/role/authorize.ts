import { IUserEntity } from '@domain/entities/user'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export interface IAuthorizer {
  user: IUserEntity
  role: string
}

export type IInputVerifyProfileDto = {
  roles: string[]
  user: IUserEntity
}

export type IOutputVerifyProfileDto = Either<IError, IAuthorizer>
