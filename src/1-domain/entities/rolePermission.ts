import { AbstractEntity } from '@domain/abstractEntity'
import { Right, right } from '@shared/either'

export interface IRolePermissionEntity {
  id: number
  uuid: string
  role_id: number
  permission_id: number
  created_at: Date
}

export type InputRolePermissionEntity = Pick<
  IRolePermissionEntity,
  'permission_id' | 'role_id'
>

export type RolePermissionEntityKeys = Pick<
  IRolePermissionEntity,
  'permission_id' | 'role_id' | 'id' | 'uuid'
>

export class RolePermissionEntity extends AbstractEntity<IRolePermissionEntity> {
  static create(
    props: InputRolePermissionEntity,
    currentDate: Date
  ): Right<void, RolePermissionEntity> {
    const rolePermissionEntity = new RolePermissionEntity({
      id: undefined,
      uuid: undefined,
      created_at: currentDate,
      ...props,
    })

    return right(rolePermissionEntity)
  }
}
