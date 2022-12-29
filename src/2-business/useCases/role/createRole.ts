import {
  IInputCreateRoleDto,
  IOutputCreateRoleDto,
} from '@business/dto/role/createRole'
import { ITransaction } from '@business/dto/transaction/create'
import {
  IRoleRepository,
  IRoleRepositoryToken,
} from '@business/repositories/role/iRoleRepository'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { IInputRoleEntity, RoleEntity } from '@domain/entities/role'
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
    private uniqueIdentifier: IUniqueIdentifierService
  ) {}

  async exec(
    props: IInputRoleEntity,
    trx?: ITransaction
  ): Promise<IOutputCreateRoleDto> {
    const roleEntity = RoleEntity.create(props, new Date())
    const roleResult = await this.roleRepository.create(
      {
        ...roleEntity.value.export(),
        uuid: this.uniqueIdentifier.create(),
      },
      trx
    )

    return roleResult
  }
}
