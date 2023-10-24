import { InputAddPermissionsToRole } from '@controller/serializers/role/addPermissionsToRole'
import { IOutputCreateManyRolePermissionsDto } from '@business/dto/rolePermission/createMany'
import { inject, injectable } from 'inversify'
import { CreateManyRolePermissionUseCase } from '@business/useCases/rolePermission/createMany'
import { IAuthorizerInformation } from '@business/dto/role/authorize'
import { left } from '@shared/either'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class AddPermissionsToRoleOperator extends AbstractOperator<
  InputAddPermissionsToRole,
  IOutputCreateManyRolePermissionsDto
> {
  constructor(
    @inject(CreateManyRolePermissionUseCase)
    private createManyRolePermissions: CreateManyRolePermissionUseCase,
    @inject(VerifyProfileUseCase)
    private verifyProfile: VerifyProfileUseCase
  ) {
    super()
  }

  async run(
    input: InputAddPermissionsToRole,
    authorizer: IAuthorizerInformation
  ): Promise<IOutputCreateManyRolePermissionsDto> {
    this.exec(input)

    const authUser = await this.verifyProfile.exec({
      permissions: ['create_role', 'create_permission'],
      user: authorizer,
    })

    if (authUser.isLeft()) {
      return left(authUser.value)
    }

    const rolePermissions = await this.createManyRolePermissions.exec({
      permissions: input.permissions,
      role_id: input.role_id,
    })

    if (rolePermissions.isLeft()) {
      return left(rolePermissions.value)
    }

    return rolePermissions
  }
}
