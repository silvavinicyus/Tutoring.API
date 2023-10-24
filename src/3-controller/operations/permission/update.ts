import { InputUpdatePermission } from '@controller/serializers/permission/update'
import { IOutputUpdatePermissionDto } from '@business/dto/permission/update'
import { UpdatePermissionUseCase } from '@business/useCases/permission/updatePermissionUseCase'
import { FindByPermissionUseCase } from '@business/useCases/permission/findByPermissionUseCase'
import { inject, injectable } from 'inversify'
import { left } from '@shared/either'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { IAuthorizerInformation } from '@business/dto/role/authorize'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class UpdatePermissionOperator extends AbstractOperator<
  InputUpdatePermission,
  IOutputUpdatePermissionDto
> {
  constructor(
    @inject(UpdatePermissionUseCase)
    private updatePermission: UpdatePermissionUseCase,
    @inject(FindByPermissionUseCase)
    private findByPermission: FindByPermissionUseCase,
    @inject(VerifyProfileUseCase)
    private verifyProfile: VerifyProfileUseCase
  ) {
    super()
  }

  async run(
    input: InputUpdatePermission,
    authorizer: IAuthorizerInformation
  ): Promise<IOutputUpdatePermissionDto> {
    this.exec(input)

    const authUser = await this.verifyProfile.exec({
      permissions: ['update_permission'],
      user: authorizer,
    })

    if (authUser.isLeft()) {
      return left(authUser.value)
    }

    const permission = await this.findByPermission.exec({
      where: [
        {
          column: 'uuid',
          value: input.uuid,
        },
      ],
    })

    if (permission.isLeft()) {
      return left(permission.value)
    }

    const permissionResult = await this.updatePermission.exec(
      {
        ...input,
      },
      {
        column: 'uuid',
        value: input.uuid,
      }
    )

    if (permissionResult.isLeft()) {
      return left(permissionResult.value)
    }

    return permissionResult
  }
}
