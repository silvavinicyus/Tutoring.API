import {
  IInputUpdatePermissionDto,
  IOutputUpdatePermissionDto,
} from '@business/dto/permission/update'
import { ITransaction } from '@business/dto/transaction/create'
import { PermissionErrors } from '@business/module/errors/permissionErrors'
import {
  IPermissionRepository,
  IPermissionRepositoryToken,
  updateWherePermission,
} from '@business/repositories/permission/iPermissionRepository'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { PermissionEntity } from '@domain/entities/permission'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class UpdatePermissionUseCase
  implements
    IAbstractUseCase<IInputUpdatePermissionDto, IOutputUpdatePermissionDto>
{
  constructor(
    @inject(IPermissionRepositoryToken)
    private permissionRepository: IPermissionRepository,
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async exec(
    props: IInputUpdatePermissionDto,
    updateWhere: updateWherePermission,
    trx?: ITransaction
  ): Promise<IOutputUpdatePermissionDto> {
    try {
      const permissionEntity = PermissionEntity.update(props)

      const permissionResult = await this.permissionRepository.update(
        {
          newData: permissionEntity.value.export(),
          updateWhere,
        },
        trx
      )

      return right(permissionResult)
    } catch (err) {
      this.loggerService.error(err)
      return left(PermissionErrors.updateFailed())
    }
  }
}
