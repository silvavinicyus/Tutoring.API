import { IEncryptionService } from '@business/services/encryption/iEncryption'
import { injectable } from 'inversify'
import { compare, hash } from 'bcrypt'

@injectable()
export class EncryptionService implements IEncryptionService {
  async comparePassword(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    const passwordMatch = await compare(password, hashedPassword)

    return passwordMatch
  }

  async createPasswordHash(password: string): Promise<string> {
    const hashedPassword = await hash(password, 8)

    return hashedPassword
  }
}
