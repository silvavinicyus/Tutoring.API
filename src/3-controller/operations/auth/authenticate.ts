import { IOutputAuthenticateDto } from '@business/dto/auth/authenticateDto'
import { AuthErrors } from '@business/module/errors/authErrors'
import { AuthenticateUseCase } from '@business/useCases/auth/authenticate'
import { FindByUserUseCase } from '@business/useCases/user/findByUser'
import { InputAuthenticate } from '@controller/serializers/auth/authenticate'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class AuthenticateOperator extends AbstractOperator<
  InputAuthenticate,
  IOutputAuthenticateDto
> {
  constructor(
    @inject(FindByUserUseCase)
    private findUser: FindByUserUseCase,
    @inject(AuthenticateUseCase)
    private authenticate: AuthenticateUseCase
  ) {
    super()
  }

  async run(input: InputAuthenticate): Promise<IOutputAuthenticateDto> {
    this.exec(input)

    const user = await this.findUser.exec({
      where: [
        {
          column: 'email',
          value: input.email,
        },
      ],
      relations: [
        {
          tableName: 'image',
          foreignJoinColumn: 'id',
          currentTableColumn: 'image_id',
        },
        {
          tableName: 'role',
          currentTableColumn: 'role_id',
          foreignJoinColumn: 'id',
          relations: [
            {
              tableName: 'permissions',
              currentTableColumn: 'id',
              foreignJoinColumn: 'role_id',
            },
          ],
        },
      ],
    })

    if (user.isLeft()) {
      return left(AuthErrors.notAllowed())
    }

    const response = await this.authenticate.exec({
      user: user.value,
      password: input.password,
    })

    if (response.isLeft()) {
      return left(response.value)
    }

    return response
  }
}
