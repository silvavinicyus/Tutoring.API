import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { Right, right } from '@shared/either'

export interface IUserEntity extends ITimestamps {
  id: number
  uuid: string
  name: string
  email: string
  cpf: string
  password: string
  role_id: number
}

export type IInputUserEntity = Pick<
  IUserEntity,
  'name' | 'email' | 'cpf' | 'password' | 'role_id'
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
}
