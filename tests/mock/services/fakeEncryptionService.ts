import { IEncryptionService } from '@business/services/encryption/iEncryption'
import { injectable } from 'inversify'

@injectable()
export class FakeEncryptionService implements IEncryptionService {
  comparePassword(
    _password: string,
    _hashedPassword: string
  ): Promise<boolean> {
    return void 0
  }
  createPasswordHash(_password: string): Promise<string> {
    return void 0
  }
}

export const fakeEncryptionServiceCreatePasswordHash = jest.spyOn(
  FakeEncryptionService.prototype,
  'createPasswordHash'
)

export const fakeEncryptionServiceComparePassword = jest.spyOn(
  FakeEncryptionService.prototype,
  'comparePassword'
)
