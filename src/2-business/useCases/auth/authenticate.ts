import {
  IInputAuthenticateDto,
  IOutputAuthenticateDto,
} from '@business/dto/auth/authenticateDto'
import { AuthErrors } from '@business/module/errors/authErrors'
import { UserMap } from '@business/utils/userMapper'
import { left, right } from '@shared/either'
import { compare } from 'bcrypt'
import { injectable } from 'inversify'
import { sign } from 'jsonwebtoken'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class AuthenticateUseCase
  implements IAbstractUseCase<IInputAuthenticateDto, IOutputAuthenticateDto>
{
  async exec(props: IInputAuthenticateDto): Promise<IOutputAuthenticateDto> {
    const passwordMatch = await compare(props.password, props.user.password)

    if (!passwordMatch) {
      return left(AuthErrors.notAllowed())
    }

    const token = sign({ email: props.user.email }, process.env.SECRET_TOKEN, {
      subject: props.user.uuid,
      expiresIn: process.env.EXPIRES_IN,
    })

    return right({
      user: UserMap.toDtoWithoutPassword(props.user),
      token,
    })
  }
}
