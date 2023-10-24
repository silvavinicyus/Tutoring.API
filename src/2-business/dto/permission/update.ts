import { IPermissionEntity } from '@domain/entities/permission'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputUpdatePermissionDto = Partial<
  Pick<IPermissionEntity, 'description' | 'name' | 'permission_group'>
>

export type IOutputUpdatePermissionDto = Either<
  IError,
  Partial<IPermissionEntity>
>
