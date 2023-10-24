import { inject, injectable } from 'inversify'
import {
  IInputDeleteManyRolePermissionDto,
  IOutputDeleteManyRolePermissionDto,
} from '@business/dto/rolePermission/deleteMany'
import {
  IRolePermissionRepository,
  IRolePermissionRepositoryToken,
} from '@business/repositories/rolePermission/iRolePermissionRepository'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { ITransaction } from '@business/dto/transaction/create'
import { left, right } from '@shared/either'
import { RolePermissionErrors } from '@business/module/errors/rolePermissionErrors'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class DeleteManyRolePermissionsUseCase
  implements
    IAbstractUseCase<
      IInputDeleteManyRolePermissionDto,
      IOutputDeleteManyRolePermissionDto
    >
{
  constructor(
    @inject(IRolePermissionRepositoryToken)
    private rolePermissionRepository: IRolePermissionRepository,
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async exec(
    props: IInputDeleteManyRolePermissionDto,
    trx?: ITransaction
  ): Promise<IOutputDeleteManyRolePermissionDto> {
    try {
      const rolePermissionsResult =
        await this.rolePermissionRepository.deleteMany(props, trx)

      return right(rolePermissionsResult)
    } catch (err) {
      this.loggerService.error(err)
      return left(RolePermissionErrors.deleteManyError())
    }
  }
}
