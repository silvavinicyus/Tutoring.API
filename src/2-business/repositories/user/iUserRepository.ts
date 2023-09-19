import { ITransaction } from '@business/dto/transaction/create'
import { IInputDeleteUserDto } from '@business/dto/user/delete'
import { IUserEntity, UserEntityKeys } from '@domain/entities/user'
import { IInputUpdateUserDto } from '@business/dto/user/update'
import { IInputFindUserByDto } from '@business/dto/user/findBy'
import { IWhere } from '../where'

export const IUserRepositoryToken = Symbol.for('UserRepositorySymbol')

export type updateWhereUser = IWhere<keyof UserEntityKeys, string | number>

export interface IInputUpdateUser {
  updateWhere: updateWhereUser
  newData: IInputUpdateUserDto
}

export interface IUserRepository {
  create(props: IUserEntity, trx?: ITransaction): Promise<IUserEntity>
  delete(props: IInputDeleteUserDto, trx?: ITransaction): Promise<void>
  update(
    props: IInputUpdateUser,
    trx?: ITransaction
  ): Promise<Partial<IUserEntity>>
  findBy(input: IInputFindUserByDto): Promise<IUserEntity>
}
