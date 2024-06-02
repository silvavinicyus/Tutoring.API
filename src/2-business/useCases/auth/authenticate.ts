import {
  IInputAuthenticateDto,
  IOutputAuthenticateDto,
} from '@business/dto/auth/authenticateDto'
import { AuthErrors } from '@business/module/errors/authErrors'
import {
  IEncryptionService,
  IEncryptionServiceToken,
} from '@business/services/encryption/iEncryption'
import { UserMap } from '@business/utils/userMapper'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { sign } from 'jsonwebtoken'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class AuthenticateUseCase
  implements IAbstractUseCase<IInputAuthenticateDto, IOutputAuthenticateDto>
{
  constructor(
    @inject(IEncryptionServiceToken)
    private encryptionService: IEncryptionService
  ) {}

  async exec(props: IInputAuthenticateDto): Promise<IOutputAuthenticateDto> {
    const passwordMatch = await this.encryptionService.comparePassword(
      props.password,
      props.user.password
    )

    if (!passwordMatch) {
      return left(AuthErrors.notAllowed())
    }

    const token = sign({ email: props.user.email }, process.env.SECRET_TOKEN, {
      subject: props.user.uuid,
      expiresIn: process.env.EXPIRES_IN,
    })

    const permissoionsString = props.user.role.permissions
      ? props.user.role.permissions
          .map((permission) => permission.name)
          .join(',')
      : ''

    return right({
      user: {
        ...UserMap.toDtoWithoutPassword(props.user),
        permissions: permissoionsString,
      },
      token,
    })
  }
}
