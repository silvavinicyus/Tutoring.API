import { AuthenticateOperator } from '@controller/operations/auth/authenticate'
import { VerifyAuthenticationOperator } from '@controller/operations/auth/verifyAuthentication'
import { CreateManyPermissionsOperator } from '@controller/operations/permission/createMany'
import { DeleteManyPermissionOperator } from '@controller/operations/permission/deleteMany'
import { UpdatePermissionOperator } from '@controller/operations/permission/update'
import { AddPermissionsToRoleOperator } from '@controller/operations/role/addPermissionsToRole'
import { CreateRoleOperator } from '@controller/operations/role/createRole'
import { CreateOrUpdateUserOperator } from '@controller/operations/user/createOrUpdate'
import { UploadUserImageOperator } from '@controller/operations/user/uploadImage'
import { ContainerModule, interfaces } from 'inversify'

export const operatorModule = new ContainerModule((bind: interfaces.Bind) => {
  bind(CreateRoleOperator).toSelf()
  bind(VerifyAuthenticationOperator).toSelf()
  bind(AuthenticateOperator).toSelf()

  bind(CreateOrUpdateUserOperator).toSelf()
  bind(UploadUserImageOperator).toSelf()

  bind(CreateManyPermissionsOperator).toSelf()
  bind(UpdatePermissionOperator).toSelf()
  bind(DeleteManyPermissionOperator).toSelf()

  bind(AddPermissionsToRoleOperator).toSelf()
})
