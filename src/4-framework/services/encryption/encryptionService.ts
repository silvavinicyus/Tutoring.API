import { IEncryptionService } from '@business/services/encryption/iEncryption'
import { injectable } from 'inversify'
import { hash } from 'bcrypt'

@injectable()
export class EncryptionService implements IEncryptionService {
  async createPasswordHash(password: string): Promise<string> {
    const hashedPassword = await hash(password, 8)

    return hashedPassword
  }
}
