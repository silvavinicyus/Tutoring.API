import {
  IStudentRepository,
  IStudentRepositoryToken,
} from '@business/repositories/student/iStudentRepository'
import {
  ITransactionRepository,
  ITransactionRepositoryToken,
} from '@business/repositories/transaction/iTransactionRepository'
import { StudentRepositorySequelize } from '@framework/repositories/sequelize/student'
import { TransactionRepositorySequelize } from '@framework/repositories/sequelize/transaction'
import { ContainerModule, interfaces } from 'inversify'

export const repositoryModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<ITransactionRepository>(ITransactionRepositoryToken).to(
    TransactionRepositorySequelize
  )

  bind<IStudentRepository>(IStudentRepositoryToken).to(
    StudentRepositorySequelize
  )
})
