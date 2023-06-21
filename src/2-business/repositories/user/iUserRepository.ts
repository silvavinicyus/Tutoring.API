import { ITransaction } from '@business/dto/transaction/create'
import { IOutputCreateUserDto } from '@business/dto/user/create'
import { IUserEntity } from '@domain/entities/user'

export const IUserRepositoryToken = Symbol.for('IUserRepositoryToken')

export interface IUserRepository {
  create(input: IUserEntity, trx?: ITransaction): Promise<IOutputCreateUserDto>
}
