import { IAuthorizerInformation } from '@business/dto/role/authorize'
import {
  ITokenService,
  ITokenServiceToken,
} from '@business/services/token/iTokenService'
import { FindByUserUseCase } from '@business/useCases/user/findByUser'
import { IError } from '@shared/IError'
import { Either, left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

type IOutputVerifyAuthentication = Either<IError, IAuthorizerInformation>

@injectable()
export class VerifyAuthenticationOperator extends AbstractOperator<
  { bearer: string },
  IOutputVerifyAuthentication
> {
  constructor(
    @inject(FindByUserUseCase)
    private findUser: FindByUserUseCase,
    @inject(ITokenServiceToken)
    private tokenService: ITokenService
  ) {
    super()
  }

  async run(input: { bearer: string }): Promise<IOutputVerifyAuthentication> {
    const { user_uuid } = this.tokenService.verify({
      bearer: input.bearer,
      secret_token: process.env.SECRET_TOKEN,
    })

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
      return left(user.value)
    }

    const {
      id,
      uuid,
      name,
      email,
      created_at,
      updated_at,
      birthdate,
      phone,
      role,
    } = user.value

    const getPermissions = role.permissions
      .map((permission) => permission.name)
      .join(',')

    const objectReturn = {
      name,
      email,
      birthdate: birthdate.toISOString(),
      phone,
      created_at: created_at ? created_at.toISOString() : '',
      updated_at: updated_at ? updated_at.toISOString() : '',
      role: role.name,
      user_real_id: id,
      user_real_uuid: uuid,
      permissions: getPermissions.toString(),
    }

    return right(objectReturn)
  }
}
