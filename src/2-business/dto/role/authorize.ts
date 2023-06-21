// import { IUserEntity } from '@domain/entities/user'
// import { Either } from '@shared/either'
// import { IError } from '@shared/IError'

// export type IAuthorizer = Pick<
//   IUserEntity,
//   | 'uuid'
//   | 'registration_number'
//   | 'email'
//   | 'device_token'
//   | 'name'
//   | 'img_url'
//   | 'cpf'
//   | 'id'
// > & {
//   role?: string
// }

// export type IInputVerifyProfileDto = {
//   roles: string[]
//   user: IAuthorizer
// }

// export type IOutputVerifyProfileDto = Either<IError, IAuthorizer>
