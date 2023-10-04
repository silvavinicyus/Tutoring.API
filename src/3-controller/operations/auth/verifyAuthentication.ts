import { IAuthorizerInformation } from '@business/dto/role/authorize'
import { FindByUserUseCase } from '@business/useCases/user/findByUser'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { inject, injectable } from 'inversify'
import { verify } from 'jsonwebtoken'
import { AbstractOperator } from '../abstractOperator'

type IOutputVerifyAuthentication = Either<IError, IAuthorizerInformation>

interface IPayload {
  sub: string
}

@injectable()
export class VerifyAuthenticationOperator extends AbstractOperator<
  { bearer: string },
  IOutputVerifyAuthentication
> {
  constructor(
    @inject(FindByUserUseCase)
    private findUser: FindByUserUseCase
  ) {
    super()
  }

  async run(input: { bearer: string }): Promise<IOutputVerifyAuthentication> {
    const { sub: user_uuid } = verify(
      input.bearer,
      process.env.SECRET_TOKEN
    ) as IPayload

    const user = await this.findUser.exec({
      where: [
        {
          column: 'uuid',
          value: user_uuid,
        },
      ],
      relations: [
        {
          tableName: 'role',
          currentTableColumn: 'role_id',
          foreignJoinColumn: 'id',
        },
      ],
    })

    if (user.isLeft()) {
      return left(user.value)
    }

    const { id, uuid, name, email, created_at, updated_at, birthdate, phone } =
      user.value

    const objectReturn = {
      name,
      email,
      birthdate: birthdate.toISOString(),
      phone,
      created_at: created_at ? created_at.toISOString() : '',
      updated_at: updated_at ? updated_at.toISOString() : '',
      role: user.value.role.name,
      user_real_id: id,
      user_real_uuid: uuid,
    }

    console.log(objectReturn)

    return right(objectReturn)
  }
}
