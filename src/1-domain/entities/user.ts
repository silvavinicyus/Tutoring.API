import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { right, Right } from '@shared/either'
import { IRoleEntity } from './role'

export interface IUserRelations {
  role: IRoleEntity
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
}

export type IInputUserEntity = Pick<
  IUserEntity,
  'name' | 'email' | 'birthdate' | 'phone' | 'password' | 'role_id'
>

export type UserEntityKeys = Pick<IUserEntity, 'name' | 'email' | 'uuid' | 'id'>

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
