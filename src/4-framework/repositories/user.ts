import { IOutputCreateUserDto } from '@business/dto/user/create'
import { IUserRepository } from '@business/repositories/user/iUserRepository'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { IUserEntity } from '@domain/entities/user'
import { inject, injectable } from 'inversify'
import { left, right } from '@shared/either'
import { UserErrors } from '@business/module/errors/userErrors'
import { UserModel } from '@framework/models/user'
import { ITransaction } from './transaction'

@injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async create(
    input: IUserEntity,
    trx?: ITransaction
  ): Promise<IOutputCreateUserDto> {
    try {
      const user = await UserModel.create(input, { transaction: trx })

      return right(user.get({ plain: true }))
    } catch (err) {
      this.loggerService.error(`CREATION ERROR: ${err}`)
      return left(UserErrors.creationError())
    }
  }
}
