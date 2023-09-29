import { IOutputCreateUserDto } from '@business/dto/user/create'
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
    private createUser: CreateUserUseCase
  ) {
    super()
  }

  async run(input: InputCreateUser): Promise<IOutputCreateUserDto> {
    this.exec(input)

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
