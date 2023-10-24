import {
  IPermissionEntity,
  PermissionEntityKeys,
} from '@domain/entities/permission'
import { IWhere } from '@business/repositories/where'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'
import { IUseCaseOptions } from '../useCaseOptions'

export interface IInputFindByPermissionDto
  extends IUseCaseOptions<keyof PermissionEntityKeys, string | number> {
  where: IWhere<keyof PermissionEntityKeys, string | number>[]
}

export type IOutputFindByPermissionDto = Either<IError, IPermissionEntity>
