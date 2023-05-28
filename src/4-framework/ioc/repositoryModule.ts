import {
  IRoleRepository,
  IRoleRepositoryToken,
} from '@business/repositories/role/iRoleRepository'
import {
  ITransactionRepository,
  ITransactionRepositoryToken,
} from '@business/repositories/transaction/iTransactionRepository'
import { RoleRepositorySequelize } from '@framework/repositories/sequelize/role'
import { TransactionRepositorySequelize } from '@framework/repositories/sequelize/transaction'
import { ContainerModule, interfaces } from 'inversify'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ITransactionRepository>(ITransactionRepositoryToken).to(
    TransactionRepositorySequelize
  )
  bind<IRoleRepository>(IRoleRepositoryToken).to(RoleRepositorySequelize)
})
