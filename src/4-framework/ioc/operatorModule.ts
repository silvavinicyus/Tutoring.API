import { AuthenticateOperator } from '@controller/operations/auth/authenticate'
import { VerifyAuthenticationOperator } from '@controller/operations/auth/verifyAuthentication'
import { CreateRoleOperator } from '@controller/operations/role/createRole'
import { CreateStudentOperator } from '@controller/operations/student/createStudent'
import { DeleteStudentOperator } from '@controller/operations/student/deleteStudent'
import { GetAllStudentsOperator } from '@controller/operations/student/getAllStudents'
import { ShowStudentOperator } from '@controller/operations/student/showStudent'
import { UpdateStudentOperator } from '@controller/operations/student/updateStudent'
import { ContainerModule, interfaces } from 'inversify'

export const operatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateStudentOperator).toSelf()
  bind(DeleteStudentOperator).toSelf()
  bind(ShowStudentOperator).toSelf()
  bind(UpdateStudentOperator).toSelf()
  bind(GetAllStudentsOperator).toSelf()
  bind(CreateRoleOperator).toSelf()
  bind(VerifyAuthenticationOperator).toSelf()
  bind(AuthenticateOperator).toSelf()
})
