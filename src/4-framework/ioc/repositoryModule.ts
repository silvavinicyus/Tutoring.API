import {
  ICourseRepository,
  ICourseRepositoryToken,
} from '@business/repositories/course/iCourseRepository'
import {
  IMajorRepository,
  IMajorRepositoryToken,
} from '@business/repositories/major/iMajorRepository'
import {
  IRoleRepository,
  IRoleRepositoryToken,
} from '@business/repositories/role/iRoleRepository'
import {
  IStudentRepository,
  IStudentRepositoryToken,
} from '@business/repositories/student/iStudentRepository'
import {
  IStudentTutoringRepository,
  IStudentTutoringRepositoryToken,
} from '@business/repositories/studentTutoring/iStudentTutoringRepository'
import {
  ITransactionRepository,
  ITransactionRepositoryToken,
} from '@business/repositories/transaction/iTransactionRepository'
import {
  ITutoringRepository,
  ITutoringRepositoryToken,
} from '@business/repositories/tutoring/iTutoringRepository'
import { CourseRepositorySequelize } from '@framework/repositories/sequelize/course'
import { MajorRepositorySequelize } from '@framework/repositories/sequelize/major'
import { RoleRepositorySequelize } from '@framework/repositories/sequelize/role'
import { StudentRepositorySequelize } from '@framework/repositories/sequelize/student'
import { StudentTutoringRepositorySequelize } from '@framework/repositories/sequelize/studentTutorings'
import { TransactionRepositorySequelize } from '@framework/repositories/sequelize/transaction'
import { TutoringRepositorySequelize } from '@framework/repositories/sequelize/tutoring'
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
  bind<IMajorRepository>(IMajorRepositoryToken).to(MajorRepositorySequelize)
  bind<ITutoringRepository>(ITutoringRepositoryToken).to(
    TutoringRepositorySequelize
  )
  bind<IStudentTutoringRepository>(IStudentTutoringRepositoryToken).to(
    StudentTutoringRepositorySequelize
  )
})
