export const IEncryptionServiceToken = Symbol.for('IEncryptionServiceToken')

export interface IEncryptionService {
  createPasswordHash(password: string): Promise<string>
}
