import { IOutputCreateUserDto } from '@business/dto/user/create'
import { CreateUserUseCase } from '@business/useCases/user/createUser'
import { InputCreateUser } from '@controller/serializers/user/inputCreateUser'
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
    console.log('_________________________')
    console.log('AQUIIIIIIIIIIIIIIIIIII')

    // this.exec(input)

    console.log('_________________________')
    console.log('AQUIIIIIIIIIIIIIIIIIII 2222')
    const user = await this.createUser.exec({ ...input, role_id: 1 })

    return user
  }
}
