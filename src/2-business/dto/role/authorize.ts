import { IUserEntity } from '@domain/entities/user'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IAuthorizerInformation = Pick<
  IUserEntity,
  'email' | 'name' | 'phone' | 'birthdate' | 'user_real_id' | 'user_real_uuid'
> & {
  role?: string
}

export type IInputVerifyProfileDto = {
  roles: string[]
  user: IAuthorizerInformation
}

export type IOutputVerifyProfileDto = Either<IError, IAuthorizerInformation>
