import { CreateRoleUseCase } from '@business/useCases/role/createRole'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { CreateStudentUseCase } from '@business/useCases/student/createStudent'
import { DeleteStudentUseCase } from '@business/useCases/student/deleteStudent'
import { FindStudentByUuidUseCase } from '@business/useCases/student/findStudentByUuid'
import { GetAllStudentsUseCase } from '@business/useCases/student/getAllStudents'
import { UpdateStudentUseCase } from '@business/useCases/student/updateStudent'
import { CreateTransactionUseCase } from '@business/useCases/transaction/CreateTransactionUseCase'
import { ContainerModule, interfaces } from 'inversify'

export const useCaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(VerifyProfileUseCase).toSelf()
  bind(CreateRoleUseCase).toSelf()

  bind(CreateTransactionUseCase).toSelf()

  bind(CreateStudentUseCase).toSelf()
  bind(FindStudentByUuidUseCase).toSelf()
  bind(DeleteStudentUseCase).toSelf()
  bind(GetAllStudentsUseCase).toSelf()
  bind(UpdateStudentUseCase).toSelf()
})
