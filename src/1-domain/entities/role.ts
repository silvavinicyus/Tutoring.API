import { AbstractEntity } from '@domain/abstractEntity'
import { right, Right } from '@shared/either'

export interface IRoleEntity {
  id: number
  uuid: string
  name: string
  description: string
  created_at: Date
}

export type IInputRoleEntity = Pick<IRoleEntity, 'name' | 'description'>

export class RoleEntity extends AbstractEntity<IRoleEntity> {
  static create(
    props: IInputRoleEntity,
    currentDate: Date
  ): Right<void, RoleEntity> {
    const roleEntity = new RoleEntity({
      id: undefined,
      uuid: undefined,
      created_at: currentDate,
      ...props,
    })

    return right(roleEntity)
  }
}
