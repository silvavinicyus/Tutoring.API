import {
  IInputCreateUserDto,
  IOutputCreateUserDto,
} from '@business/dto/user/create'
import { ITransaction } from '@business/dto/transaction/create'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@business/repositories/user/iUserRepository'
import {
  IEncryptionService,
  IEncryptionServiceToken,
} from '@business/services/encryption/iEncryption'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { UserMap } from '@business/utils/userMapper'
import { IInputUserEntity, UserEntity } from '@domain/entities/user'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { UserErrors } from '@business/module/errors/user'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateUserUseCase
  implements IAbstractUseCase<IInputCreateUserDto, IOutputCreateUserDto>
{
  constructor(
    @inject(IUserRepositoryToken)
    private userRepository: IUserRepository,
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifier: IUniqueIdentifierService,
    @inject(IEncryptionServiceToken)
    private encryptionService: IEncryptionService,
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async exec(
    props: IInputUserEntity,
    trx?: ITransaction
  ): Promise<IOutputCreateUserDto> {
    try {
      const hashedPassword = await this.encryptionService.createPasswordHash(
        props.password
      )

      const userEntity = UserEntity.create(
        { ...props, password: hashedPassword },
        new Date()
      )

      const userResult = await this.userRepository.create(
        {
          ...userEntity.value.export(),
          uuid: this.uniqueIdentifier.create(),
        },
        trx
      )

      return right(UserMap.toDtoWithoutPassword(userResult))
    } catch (err) {
      this.loggerService.error(err)
      return left(UserErrors.creationError())
    }
  }
}
