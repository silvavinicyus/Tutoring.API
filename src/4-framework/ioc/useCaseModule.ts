import { CreateRoleUseCase } from '@business/useCases/role/createRole'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { CreateTransactionUseCase } from '@business/useCases/transaction/CreateTransactionUseCase'
import { CreateUserUseCase } from '@business/useCases/user/createUser'
import { ContainerModule, interfaces } from 'inversify'

export const useCaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(VerifyProfileUseCase).toSelf()
  bind(CreateRoleUseCase).toSelf()
  bind(CreateTransactionUseCase).toSelf()
  bind(CreateUserUseCase).toSelf()
})
