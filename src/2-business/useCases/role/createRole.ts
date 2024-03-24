import {
  IInputCreateRoleDto,
  IOutputCreateRoleDto,
} from '@business/dto/role/createRole'
import { ITransaction } from '@business/dto/transaction/create'
import { RolesErrors } from '@business/module/errors/rolesErrors'
import {
  IRoleRepository,
  IRoleRepositoryToken,
} from '@business/repositories/role/iRoleRepository'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { IInputRoleEntity, RoleEntity } from '@domain/entities/role'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateRoleUseCase
  implements IAbstractUseCase<IInputCreateRoleDto, IOutputCreateRoleDto>
{
  constructor(
    @inject(IRoleRepositoryToken)
    private roleRepository: IRoleRepository,
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifier: IUniqueIdentifierService,
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async exec(
    props: IInputRoleEntity,
    trx?: ITransaction
  ): Promise<IOutputCreateRoleDto> {
    try {
      const roleEntity = RoleEntity.create(props, new Date())
      const roleResult = await this.roleRepository.create(
        {
          ...roleEntity.value.export(),
          uuid: this.uniqueIdentifier.create(),
        },
        trx
      )

      return right(roleResult)
    } catch (err) {
      this.loggerService.error(err)
      return left(RolesErrors.creationError())
    }
  }
}
