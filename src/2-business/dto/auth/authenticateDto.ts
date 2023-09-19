import { IUserEntity } from '@domain/entities/user'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

type IAuthenticateOutput = {
  user: Partial<IUserEntity>
  token: string
}

export type IInputAuthenticateDto = {
  user: IUserEntity
  password: string
}

export type IOutputAuthenticateDto = Either<IError, IAuthenticateOutput>
