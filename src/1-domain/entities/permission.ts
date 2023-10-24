import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { Right, right } from '@shared/either'

export interface IPermissionEntity extends ITimestamps {
  id: number
  uuid: string
  name: string
  description: string
  permission_group: string
}

export type IInputPermissionEntity = Pick<
  IPermissionEntity,
  'name' | 'description' | 'permission_group'
>

export type PermissionEntityKeys = Pick<
  IPermissionEntity,
  'name' | 'permission_group' | 'id' | 'uuid'
>

export class PermissionEntity extends AbstractEntity<IPermissionEntity> {
  static create(
    props: IInputPermissionEntity,
    currentDate: Date
  ): Right<void, PermissionEntity> {
    const permissionEntity = new PermissionEntity({
      id: undefined,
      uuid: undefined,
      created_at: currentDate,
      updated_at: currentDate,
      ...props,
    })

    return right(permissionEntity)
  }

  static update(
    props: Partial<IPermissionEntity>
  ): Right<void, PermissionEntity> {
    const permissionEntity = new PermissionEntity({
      ...props,
      updated_at: new Date(),
    } as IPermissionEntity)

    return right(permissionEntity)
  }
}
