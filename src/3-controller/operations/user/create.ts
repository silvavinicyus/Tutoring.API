import { IAuthorizer } from '@business/dto/role/authorize'
import { IOutputCreateUserDto } from '@business/dto/user/create'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { CreateUserUseCase } from '@business/useCases/user/createUser'
import { InputCreateUser } from '@controller/serializers/user/createUser'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class CreateUserOperator extends AbstractOperator<
  InputCreateUser,
  IOutputCreateUserDto
> {
  constructor(
    @inject(CreateUserUseCase)
    private createUser: CreateUserUseCase,
    @inject(VerifyProfileUseCase)
    private verifyProfile: VerifyProfileUseCase
  ) {
    super()
  }

  async run(
    input: InputCreateUser,
    authorizer: IAuthorizer
  ): Promise<IOutputCreateUserDto> {
    this.exec(input)

    const authUserResult = await this.verifyProfile.exec({
      user: authorizer,
      roles: [],
    })

    if (authUserResult.isLeft()) {
      return left(authUserResult.value)
    }

    const userResult = await this.createUser.exec({
      ...input,
      role_id: 3,
    })

    if (userResult.isLeft()) {
      return left(userResult.value)
    }

    return userResult
  }
}
