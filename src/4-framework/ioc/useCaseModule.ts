import { AuthenticateUseCase } from '@business/useCases/auth/authenticate'
import { CreateCourseUseCase } from '@business/useCases/course/createCourse'
import { FindCourseByUuidUseCase } from '@business/useCases/course/findCourseByUuid'
import { CreateMajorUseCase } from '@business/useCases/major/createMajor'
import { FindMajorByUuidUseCase } from '@business/useCases/major/findMajorByUuid'
import { CreateRoleUseCase } from '@business/useCases/role/createRole'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { CreateStudentUseCase } from '@business/useCases/student/createStudent'
import { DeleteStudentUseCase } from '@business/useCases/student/deleteStudent'
import { FindStudentByUuidUseCase } from '@business/useCases/student/findStudentByUuid'
import { GetAllStudentsUseCase } from '@business/useCases/student/getAllStudents'
import { UpdateStudentUseCase } from '@business/useCases/student/updateStudent'
import { CreateTransactionUseCase } from '@business/useCases/transaction/CreateTransactionUseCase'
import { CreateTutoringUseCase } from '@business/useCases/tutoring/createTutoring'
import { FindTutoringByUuidUseCase } from '@business/useCases/tutoring/showTutoring'
import { ContainerModule, interfaces } from 'inversify'

export const useCaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(VerifyProfileUseCase).toSelf()
  bind(UpdateStudentUseCase).toSelf()

  bind(CreateRoleUseCase).toSelf()

  bind(CreateTransactionUseCase).toSelf()

  bind(CreateStudentUseCase).toSelf()
  bind(FindStudentByUuidUseCase).toSelf()
  bind(DeleteStudentUseCase).toSelf()
  bind(GetAllStudentsUseCase).toSelf()

  bind(AuthenticateUseCase).toSelf()

  bind(CreateCourseUseCase).toSelf()
  bind(FindCourseByUuidUseCase).toSelf()

  bind(CreateMajorUseCase).toSelf()
  bind(FindMajorByUuidUseCase).toSelf()

  bind(CreateTutoringUseCase).toSelf()
  bind(FindTutoringByUuidUseCase).toSelf()
})
