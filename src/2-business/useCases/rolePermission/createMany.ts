import { inject, injectable } from 'inversify'
import {
  IInputCreateManyRolePermissionsDto,
  IOutputCreateManyRolePermissionsDto,
} from '@business/dto/rolePermission/createMany'
import {
  IRolePermissionRepository,
  IRolePermissionRepositoryToken,
} from '@business/repositories/rolePermission/iRolePermissionRepository'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { ITransaction } from '@business/dto/transaction/create'
import { left, right } from '@shared/either'
import { RolePermissionErrors } from '@business/module/errors/rolePermissionErrors'
import { RolePermissionEntity } from '@domain/entities/rolePermission'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateManyRolePermissionUseCase
  implements
    IAbstractUseCase<
      IInputCreateManyRolePermissionsDto,
      IOutputCreateManyRolePermissionsDto
    >
{
  constructor(
    @inject(IRolePermissionRepositoryToken)
    private rolePermissionRepository: IRolePermissionRepository,
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifier: IUniqueIdentifierService,
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async exec(
    props: IInputCreateManyRolePermissionsDto,
    trx?: ITransaction
  ): Promise<IOutputCreateManyRolePermissionsDto> {
    try {
      const rolePermissionsEntities = props.permissions.map((permission) => ({
        ...RolePermissionEntity.create(
          {
            permission_id: permission,
            role_id: props.role_id,
          },
          new Date()
        ).value.export(),
        uuid: this.uniqueIdentifier.create(),
      }))

      const rolePermissionsResult =
        await this.rolePermissionRepository.createMany(
          rolePermissionsEntities,
          trx
        )

      return right(rolePermissionsResult)
    } catch (err) {
      this.loggerService.error(err)
      return left(RolePermissionErrors.createManyError())
    }
  }
}
