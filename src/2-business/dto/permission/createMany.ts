import {
  IInputPermissionEntity,
  IPermissionEntity,
} from '@domain/entities/permission'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputCreateManyPermissionsDto = IInputPermissionEntity[]

export type IOutputCreateManyPermissionsDto = Either<
  IError,
  IPermissionEntity[]
>
