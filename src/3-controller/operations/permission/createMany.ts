import { IOutputCreateManyPermissionsDto } from '@business/dto/permission/createMany'
import { CreateManyPermissionsUseCase } from '@business/useCases/permission/createManyPermissionsUseCase'
import { InputCreateManyPermissions } from '@controller/serializers/permission/create'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAuthorizerInformation } from '@business/dto/role/authorize'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class CreateManyPermissionsOperator extends AbstractOperator<
  InputCreateManyPermissions,
  IOutputCreateManyPermissionsDto
> {
  constructor(
    @inject(CreateManyPermissionsUseCase)
    private createManyPermissions: CreateManyPermissionsUseCase,
    @inject(VerifyProfileUseCase)
    private verifyProfile: VerifyProfileUseCase
  ) {
    super()
  }

  async run(
    input: InputCreateManyPermissions,
    authorizer: IAuthorizerInformation
  ): Promise<IOutputCreateManyPermissionsDto> {
    this.exec(input)

    const authUser = await this.verifyProfile.exec({
      permissions: ['create_permission'],
      user: authorizer,
    })

    if (authUser.isLeft()) {
      return left(authUser.value)
    }

    const permission = await this.createManyPermissions.exec(input.permissions)

    if (permission.isLeft()) {
      return left(permission.value)
    }

    return permission
  }
}
