import { IRolePermissionEntity } from '@domain/entities/rolePermission'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputCreateManyRolePermissionsDto = {
  role_id: number
  permissions: number[]
}

export type IOutputCreateManyRolePermissionsDto = Either<
  IError,
  IRolePermissionEntity[]
>
