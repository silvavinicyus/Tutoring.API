import {
  IInputDeleteUserDto,
  IOutputDeleteUserDto,
} from '@business/dto/user/delete'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@business/repositories/user/iUserRepository'
import { inject, injectable } from 'inversify'
import { left, right } from '@shared/either'
import { UserErrors } from '@business/module/errors/user'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class DeleteUserUseCase
  implements IAbstractUseCase<IInputDeleteUserDto, IOutputDeleteUserDto>
{
  constructor(
    @inject(IUserRepositoryToken)
    private userRepository: IUserRepository,
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async exec(props: IInputDeleteUserDto): Promise<IOutputDeleteUserDto> {
    try {
      const user = await this.userRepository.delete(props)

      return right(user)
    } catch (err) {
      this.loggerService.error(err)
      return left(UserErrors.deleteFailed())
    }
  }
}
