import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { right, Right } from '@shared/either'
import { IRoleEntity } from './role'
import { IFileEntity } from './file'

export interface IUserRelations {
  role: IRoleEntity
  image: IFileEntity
}

export interface IUserEntity extends ITimestamps, Partial<IUserRelations> {
  id: number
  uuid: string
  name: string
  email: string
  birthdate: Date
  phone: string
  password: string
  role_id: number
  image_id?: number
  user_real_id: number
  user_real_uuid: string
}

export type IInputUserEntity = Pick<
  IUserEntity,
  | 'name'
  | 'email'
  | 'birthdate'
  | 'phone'
  | 'password'
  | 'role_id'
  | 'user_real_id'
  | 'user_real_uuid'
>

export type UserEntityKeys = Pick<
  IUserEntity,
  'name' | 'email' | 'uuid' | 'id' | 'user_real_id' | 'user_real_uuid'
>

export class UserEntity extends AbstractEntity<IUserEntity> {
  static create(
    props: IInputUserEntity,
    currentDate: Date
  ): Right<void, UserEntity> {
    const userEntity = new UserEntity({
      id: undefined,
      uuid: undefined,
      created_at: currentDate,
      updated_at: currentDate,
      ...props,
    })
    return right(userEntity)
  }

  static update(
    props: Partial<IUserEntity>,
    currentDate: Date
  ): Right<void, UserEntity> {
    const userEntity = new UserEntity({
      ...props,
      updated_at: currentDate,
    } as IUserEntity)
    return right(userEntity)
  }
}
