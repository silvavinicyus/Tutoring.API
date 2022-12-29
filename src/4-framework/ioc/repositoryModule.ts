import {
  ICourseRepository,
  ICourseRepositoryToken,
} from '@business/repositories/course/iCourseRepository'
import {
  IRoleRepository,
  IRoleRepositoryToken,
} from '@business/repositories/role/iRoleRepository'
import {
  IStudentRepository,
  IStudentRepositoryToken,
} from '@business/repositories/student/iStudentRepository'
import {
  ITransactionRepository,
  ITransactionRepositoryToken,
} from '@business/repositories/transaction/iTransactionRepository'
import { CourseRepositorySequelize } from '@framework/repositories/sequelize/course'
import { RoleRepositorySequelize } from '@framework/repositories/sequelize/role'
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
  bind<IRoleRepository>(IRoleRepositoryToken).to(RoleRepositorySequelize)
  bind<ICourseRepository>(ICourseRepositoryToken).to(CourseRepositorySequelize)
})
