import { IOutputCreateUserDto } from '@business/dto/user/create'
import { CreateUserUseCase } from '@business/useCases/user/createUser'
import { InputCreateUser } from '@controller/serializers/user/createUser'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { FindByUserUseCase } from '@business/useCases/user/findByUser'
import { UpdateUserUseCase } from '@business/useCases/user/updateUser'
import { UserErrors } from '@business/module/errors/user'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class CreateOrUpdateUserOperator extends AbstractOperator<
  InputCreateUser,
  IOutputCreateUserDto
> {
  constructor(
    @inject(CreateUserUseCase)
    private createUser: CreateUserUseCase,
    @inject(FindByUserUseCase)
    private findByUser: FindByUserUseCase,
    @inject(UpdateUserUseCase)
    private updateUser: UpdateUserUseCase
  ) {
    super()
  }

  async run(input: InputCreateUser): Promise<IOutputCreateUserDto> {
    this.exec(input)

    const userExists = await this.findByUser.exec({
      where: [
        {
          column: 'user_real_id',
          value: input.user_real_id,
        },
      ],
    })

    if (
      userExists.isLeft() &&
      userExists.value.statusCode === UserErrors.notFound().statusCode
    ) {
      const userResult = await this.createUser.exec({
        ...input,
        role_id: 3,
      })

      if (userResult.isLeft()) {
        return left(userResult.value)
      }

      return userResult
    }

    if (userExists.isLeft()) {
      return left(userExists.value)
    }

    const notNullUpdateFields = {}
    const inputKeys = Object.keys(input)
    const updatableFields = ['name', 'phone', 'birthdate']

    inputKeys.forEach((key) => {
      if (input[key] && updatableFields.find((field) => key === field)) {
        notNullUpdateFields[key] = input[key]
      }
    })

    const userUpdated = await this.updateUser.exec(notNullUpdateFields, {
      column: 'user_real_id',
      value: input.user_real_id,
    })

    if (userUpdated.isLeft()) {
      return left(userUpdated.value)
    }

    return userUpdated
  }
}
