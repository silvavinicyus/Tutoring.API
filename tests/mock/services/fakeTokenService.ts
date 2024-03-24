import {
  ITokenService,
  IVerifyProps,
} from '@business/services/token/iTokenService'
import { injectable } from 'inversify'

@injectable()
export class FakeTokenService implements ITokenService {
  verify(_props: IVerifyProps): { user_uuid: string } {
    return void 0
  }
}

export const fakeTokenServiceVerify = jest.spyOn(
  FakeTokenService.prototype,
  'verify'
)
