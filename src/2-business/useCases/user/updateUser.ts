import {
  IInputUpdateUserDto,
  IOutputUpdateUserDto,
} from '@business/dto/user/update'
import { ITransaction } from '@business/dto/transaction/create'
import {
  IUserRepository,
  IUserRepositoryToken,
  updateWhereUser,
} from '@business/repositories/user/iUserRepository'
import { UserEntity } from '@domain/entities/user'
import { inject, injectable } from 'inversify'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { left, right } from '@shared/either'
import { UserErrors } from '@business/module/errors/user'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class UpdateUserUseCase
  implements IAbstractUseCase<IInputUpdateUserDto, IOutputUpdateUserDto>
{
  constructor(
    @inject(IUserRepositoryToken)
    private userRepository: IUserRepository,
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async exec(
    props: IInputUpdateUserDto,
    updateWhere: updateWhereUser,
    trx?: ITransaction
  ): Promise<IOutputUpdateUserDto> {
    try {
      const userEntity = UserEntity.update(props, new Date())

      const userResult = await this.userRepository.update(
        {
          newData: userEntity.value.export(),
          updateWhere,
        },
        trx
      )

      return right(userResult)
    } catch (err) {
      this.loggerService.error(err)
      return left(UserErrors.updateError())
    }
  }
}
