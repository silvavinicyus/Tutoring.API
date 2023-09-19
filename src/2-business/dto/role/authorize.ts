import { IUserEntity } from '@domain/entities/user'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IAuthorizer = Pick<
  IUserEntity,
  'uuid' | 'email' | 'name' | 'id' | 'phone' | 'birthdate'
> & {
  role?: string
}

export type IInputVerifyProfileDto = {
  roles: string[]
  user: IAuthorizer
}

export type IOutputVerifyProfileDto = Either<IError, IAuthorizer>
