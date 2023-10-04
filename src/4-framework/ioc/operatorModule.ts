import { AuthenticateOperator } from '@controller/operations/auth/authenticate'
import { VerifyAuthenticationOperator } from '@controller/operations/auth/verifyAuthentication'
import { CreateRoleOperator } from '@controller/operations/role/createRole'
import { CreateUserOperator } from '@controller/operations/user/create'
import { UploadUserImageOperator } from '@controller/operations/user/uploadImage'
import { ContainerModule, interfaces } from 'inversify'

export const operatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateRoleOperator).toSelf()
  bind(VerifyAuthenticationOperator).toSelf()
  bind(AuthenticateOperator).toSelf()

  bind(CreateUserOperator).toSelf()
  bind(UploadUserImageOperator).toSelf()
})
