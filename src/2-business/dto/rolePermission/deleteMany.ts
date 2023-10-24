import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputDeleteManyRolePermissionDto = {
  role_id: number
  permissions: number[]
}

export type IOutputDeleteManyRolePermissionDto = Either<IError, void>
