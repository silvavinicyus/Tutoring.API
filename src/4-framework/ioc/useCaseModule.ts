import { AuthenticateUseCase } from '@business/useCases/auth/authenticate'
import { CreateFileUseCase } from '@business/useCases/file/createFile'
import { DeleteFileUseCase } from '@business/useCases/file/deleteFile'
import { FindByFileUseCase } from '@business/useCases/file/findByFile'
import { CreateManyPermissionsUseCase } from '@business/useCases/permission/createManyPermissionsUseCase'
import { DeletePermissionUseCase } from '@business/useCases/permission/deleteManyPermissionsUseCase'
import { FindByPermissionUseCase } from '@business/useCases/permission/findByPermissionUseCase'
import { UpdatePermissionUseCase } from '@business/useCases/permission/updatePermissionUseCase'
import { CreateRoleUseCase } from '@business/useCases/role/createRole'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { CreateManyRolePermissionUseCase } from '@business/useCases/rolePermission/createMany'
import { DeleteManyRolePermissionsUseCase } from '@business/useCases/rolePermission/deleteMany'
import { DeletePrivateFileUseCase } from '@business/useCases/storage/deletePrivateFile'
import { SavePrivateFileUseCase } from '@business/useCases/storage/savePrivateFile'
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

  bind(SavePrivateFileUseCase).toSelf()
  bind(DeletePrivateFileUseCase).toSelf()

  bind(CreateFileUseCase).toSelf()
  bind(DeleteFileUseCase).toSelf()
  bind(FindByFileUseCase).toSelf()

  bind(CreateManyPermissionsUseCase).toSelf()
  bind(DeletePermissionUseCase).toSelf()
  bind(UpdatePermissionUseCase).toSelf()
  bind(FindByPermissionUseCase).toSelf()

  bind(CreateManyRolePermissionUseCase).toSelf()
  bind(DeleteManyRolePermissionsUseCase).toSelf()
})
