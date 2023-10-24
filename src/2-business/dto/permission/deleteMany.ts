import { IError } from '@shared/IError'
import { Either } from '@shared/either'

export type IInputDeleteManyPermissionsDto = {
  ids: number[]
}

export type IOutputDeleteManyPermissionsDto = Either<IError, void>
