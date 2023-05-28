import { AuthenticateOperator } from '@controller/operations/auth/authenticate'
import { VerifyAuthenticationOperator } from '@controller/operations/auth/verifyAuthentication'
import { CreateRoleOperator } from '@controller/operations/role/createRole'
import { ContainerModule, interfaces } from 'inversify'

export const operatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateRoleOperator).toSelf()
  bind(VerifyAuthenticationOperator).toSelf()
  bind(AuthenticateOperator).toSelf()
})
