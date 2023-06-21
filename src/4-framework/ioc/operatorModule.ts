import { CreateRoleOperator } from '@controller/operations/role/createRole'
import { CreateUserOperator } from '@controller/operations/user/createUser'
import { ContainerModule, interfaces } from 'inversify'

export const operatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateRoleOperator).toSelf()
  bind(CreateUserOperator).toSelf()
})
