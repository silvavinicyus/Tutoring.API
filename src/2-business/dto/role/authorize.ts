import { IRoleEntity } from '@domain/entities/role'
import { IUserEntity } from '@domain/entities/user'

export interface IAuthorizer {
  user: IUserEntity
  roles: IRoleEntity[]
}
