import { inject, injectable } from 'inversify'
import { InputDeleteUser } from '@controller/serializers/user/deleteUser'
import { IOutputDeleteUserDto } from '@business/dto/user/delete'
import { FindByUserUseCase } from '@business/useCases/user/findByUser'
import { DeleteUserUseCase } from '@business/useCases/user/deleteUser'
import { left } from '@shared/either'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class DeleteUserOperator extends AbstractOperator<
  InputDeleteUser,
  IOutputDeleteUserDto
> {
  constructor(
    @inject(FindByUserUseCase)
    private findByUser: FindByUserUseCase,
    @inject(DeleteUserUseCase)
    private deleteUser: DeleteUserUseCase
  ) {
    super()
  }

  async run(input: InputDeleteUser): Promise<IOutputDeleteUserDto> {
    this.exec(input)

    const userExists = await this.findByUser.exec({
      where: [
        {
          column: 'user_real_id',
          value: input.id,
        },
      ],
    })

    if (userExists.isLeft()) {
      return left(userExists.value)
    }

    const userResult = await this.deleteUser.exec({
      id: input.id,
    })

    if (userResult.isLeft()) {
      return left(userResult.value)
    }

    return userResult
  }
}
