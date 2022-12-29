import { RolesErrors } from '@business/module/errors/rolesErrors'
import { IRoleRepository } from '@business/repositories/role/iRoleRepository'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { IRoleEntity } from '@domain/entities/role'
import { RoleModel } from '@framework/models/role'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { inject, injectable } from 'inversify'
import { ITransaction } from './transaction'

@injectable()
export class RoleRepositorySequelize implements IRoleRepository {
  constructor(
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async create(
    props: IRoleEntity,
    trx?: ITransaction
  ): Promise<Either<IError, IRoleEntity>> {
    try {
      const role = await RoleModel.create(props, { transaction: trx })

      return right(role.get({ plain: true }))
    } catch (err) {
      this.loggerService.error(`CREATION ERROR: ${err}`)
      return left(RolesErrors.creationError())
    }
  }
}
