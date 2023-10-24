import { IOutputCreateRoleDto } from '@business/dto/role/createRole'
import { CreateRoleUseCase } from '@business/useCases/role/createRole'
import { InputCreateRole } from '@controller/serializers/role/createRole'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAuthorizerInformation } from '@business/dto/role/authorize'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class CreateRoleOperator extends AbstractOperator<
  InputCreateRole,
  IOutputCreateRoleDto
> {
  constructor(
    @inject(CreateRoleUseCase)
    private createRole: CreateRoleUseCase,
    @inject(VerifyProfileUseCase)
    private verifyProfile: VerifyProfileUseCase
  ) {
    super()
  }

  async run(
    input: InputCreateRole,
    authorizer: IAuthorizerInformation
  ): Promise<IOutputCreateRoleDto> {
    this.exec(input)

    const authUser = await this.verifyProfile.exec({
      permissions: ['create_role'],
      user: authorizer,
    })

    if (authUser.isLeft()) {
      return left(authUser.value)
    }

    const role = await this.createRole.exec({ ...input })

    if (role.isLeft()) {
      return left(role.value)
    }

    return role
  }
}
