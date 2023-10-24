import { inject, injectable } from 'inversify'
import {
  IInputCreateManyPermissionsDto,
  IOutputCreateManyPermissionsDto,
} from '@business/dto/permission/createMany'
import {
  IInputPermissionEntity,
  PermissionEntity,
} from '@domain/entities/permission'
import {
  IPermissionRepository,
  IPermissionRepositoryToken,
} from '@business/repositories/permission/iPermissionRepository'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { ITransaction } from '@business/dto/transaction/create'
import { left, right } from '@shared/either'
import { PermissionErrors } from '@business/module/errors/permissionErrors'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateManyPermissionsUseCase
  implements
    IAbstractUseCase<
      IInputCreateManyPermissionsDto,
      IOutputCreateManyPermissionsDto
    >
{
  constructor(
    @inject(IPermissionRepositoryToken)
    private permissionRepository: IPermissionRepository,
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService,
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifier: IUniqueIdentifierService
  ) {}

  async exec(
    props: IInputPermissionEntity[],
    trx?: ITransaction
  ): Promise<IOutputCreateManyPermissionsDto> {
    try {
      const permissions = props.map((permission) => ({
        ...PermissionEntity.create(permission, new Date()).value.export(),
        uuid: this.uniqueIdentifier.create(),
      }))

      const permissionResult = await this.permissionRepository.createMany(
        permissions,
        trx
      )

      return right(permissionResult)
    } catch (err) {
      this.loggerService.error(err)
      return left(PermissionErrors.creationFailed())
    }
  }
}
