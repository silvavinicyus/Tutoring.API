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
import { RoleRepository } from '@framework/repositories/role'
import { TransactionRepositorySequelize } from '@framework/repositories/transaction'
import { UserRepository } from '@framework/repositories/user'
import { ContainerModule, interfaces } from 'inversify'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ITransactionRepository>(ITransactionRepositoryToken).to(
    TransactionRepositorySequelize
  )
  bind<IRoleRepository>(IRoleRepositoryToken).to(RoleRepository)
  bind<IUserRepository>(IUserRepositoryToken).to(UserRepository)
})
