import {
  ITokenService,
  IVerifyProps,
} from '@business/services/token/iTokenService'
import { injectable } from 'inversify'
import { verify as jwtVerify } from 'jsonwebtoken'

@injectable()
export class JwtService implements ITokenService {
  verify(props: IVerifyProps): { user_uuid: string } {
    const { sub: user_uuid } = jwtVerify(props.bearer, props.secret_token) as {
      sub: string
    }

    return { user_uuid }
  }
}
