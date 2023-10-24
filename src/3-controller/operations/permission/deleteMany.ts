import { IOutputDeleteManyPermissionsDto } from '@business/dto/permission/deleteMany'
import { DeletePermissionUseCase } from '@business/useCases/permission/deleteManyPermissionsUseCase'
import { InputDeletePermission } from '@controller/serializers/permission/delete'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAuthorizerInformation } from '@business/dto/role/authorize'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class DeleteManyPermissionOperator extends AbstractOperator<
  InputDeletePermission,
  IOutputDeleteManyPermissionsDto
> {
  constructor(
    @inject(DeletePermissionUseCase)
    private deletePermission: DeletePermissionUseCase,
    @inject(VerifyProfileUseCase)
    private verifyProfile: VerifyProfileUseCase
  ) {
    super()
  }

  async run(
    input: InputDeletePermission,
    authorizer: IAuthorizerInformation
  ): Promise<IOutputDeleteManyPermissionsDto> {
    this.exec(input)

    const authUser = await this.verifyProfile.exec({
      permissions: ['delete_permission'],
      user: authorizer,
    })

    if (authUser.isLeft()) {
      return left(authUser.value)
    }

    const permissionResult = await this.deletePermission.exec({
      ids: input.ids,
    })

    if (permissionResult.isLeft()) {
      return left(permissionResult.value)
    }

    return permissionResult
  }
}
