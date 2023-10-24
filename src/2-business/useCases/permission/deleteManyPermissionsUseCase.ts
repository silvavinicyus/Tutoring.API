import { inject, injectable } from 'inversify'
import {
  IInputDeleteManyPermissionsDto,
  IOutputDeleteManyPermissionsDto,
} from '@business/dto/permission/deleteMany'
import {
  IPermissionRepository,
  IPermissionRepositoryToken,
} from '@business/repositories/permission/iPermissionRepository'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { ITransaction } from '@business/dto/transaction/create'
import { left, right } from '@shared/either'
import { PermissionErrors } from '@business/module/errors/permissionErrors'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class DeletePermissionUseCase
  implements
    IAbstractUseCase<
      IInputDeleteManyPermissionsDto,
      IOutputDeleteManyPermissionsDto
    >
{
  constructor(
    @inject(IPermissionRepositoryToken)
    private permissionRepository: IPermissionRepository,
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async exec(
    props: IInputDeleteManyPermissionsDto,
    trx?: ITransaction
  ): Promise<IOutputDeleteManyPermissionsDto> {
    try {
      const permissionResult = await this.permissionRepository.deleteMany(
        props,
        trx
      )

      return right(permissionResult)
    } catch (err) {
      this.loggerService.error(err)
      return left(PermissionErrors.deleteFailed())
    }
  }
}
