import { inject, injectable } from 'inversify'
import {
  IInputCreateUserDto,
  IOutputCreateUserDto,
} from '@business/dto/user/create'
import { IInputUserEntity, UserEntity } from '@domain/entities/user'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@business/repositories/user/iUserRepository'
import { ITransaction } from '@business/dto/transaction/create'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateUserUseCase
  implements IAbstractUseCase<IInputCreateUserDto, IOutputCreateUserDto>
{
  constructor(
    @inject(IUserRepositoryToken)
    private userRepository: IUserRepository,
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifier: IUniqueIdentifierService
  ) {}

  async exec(
    props: IInputUserEntity,
    trx?: ITransaction
  ): Promise<IOutputCreateUserDto> {
    const userEntity = UserEntity.create(props, new Date())

    const user = await this.userRepository.create(
      {
        ...userEntity.value.export(),
        uuid: this.uniqueIdentifier.create(),
      },
      trx
    )

    return user
  }
}
