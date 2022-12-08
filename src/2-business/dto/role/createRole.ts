import { IInputRoleEntity, IRoleEntity } from '@domain/entities/role'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputCreateRoleDto = IInputRoleEntity

export type IOutputCreateRoleDto = Either<IError, IRoleEntity>
