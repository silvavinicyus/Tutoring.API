import { AuthenticateUseCase } from '@business/useCases/auth/authenticate'
import { CreateRoleUseCase } from '@business/useCases/role/createRole'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { CreateTransactionUseCase } from '@business/useCases/transaction/CreateTransactionUseCase'
import { CreateUserUseCase } from '@business/useCases/user/createUser'
import { DeleteUserUseCase } from '@business/useCases/user/deleteUser'
import { UpdateUserUseCase } from '@business/useCases/user/updateUser'
import { ContainerModule, interfaces } from 'inversify'

export const useCaseModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(VerifyProfileUseCase).toSelf()
  bind(CreateRoleUseCase).toSelf()
  bind(CreateTransactionUseCase).toSelf()
  bind(AuthenticateUseCase).toSelf()

  bind(CreateUserUseCase).toSelf()
  bind(DeleteUserUseCase).toSelf()
  bind(UpdateUserUseCase).toSelf()
})
