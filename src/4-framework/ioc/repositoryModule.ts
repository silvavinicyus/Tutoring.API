import {
  IRoleRepository,
  IRoleRepositoryToken,
} from '@business/repositories/role/iRoleRepository'
import {
  ITransactionRepository,
  ITransactionRepositoryToken,
} from '@business/repositories/transaction/iTransactionRepository'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@business/repositories/user/iUserRepository'
import { RoleRepository } from '@framework/repositories/sequelize/role'
import { TransactionRepository } from '@framework/repositories/sequelize/transaction'
import { UserRepository } from '@framework/repositories/sequelize/user'
import { ContainerModule, interfaces } from 'inversify'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ITransactionRepository>(ITransactionRepositoryToken).to(
    TransactionRepository
  )
  bind<IRoleRepository>(IRoleRepositoryToken).to(RoleRepository)

  bind<IUserRepository>(IUserRepositoryToken).to(UserRepository)
})
