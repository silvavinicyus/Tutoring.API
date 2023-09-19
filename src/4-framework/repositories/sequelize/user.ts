import { IInputDeleteUserDto } from '@business/dto/user/delete'
import {
  IInputUpdateUser,
  IUserRepository,
} from '@business/repositories/user/iUserRepository'
import { IUserEntity } from '@domain/entities/user'
import { UserModel } from '@framework/models/user'
import { injectable } from 'inversify'
import { IInputFindUserByDto } from '@business/dto/user/findBy'
import { createFindAllOptions } from '@framework/utility/repositoryUtils'
import { ITransaction } from './transaction'

@injectable()
export class UserRepository implements IUserRepository {
  async update(
    props: IInputUpdateUser,
    trx?: ITransaction
  ): Promise<Partial<IUserEntity>> {
    await UserModel.update(props.newData, {
      where: {
        [props.updateWhere.column]: props.updateWhere.value,
      },
      transaction: trx,
    })

    return props.newData as IUserEntity
  }

  async create(props: IUserEntity, trx?: ITransaction): Promise<IUserEntity> {
    const user = await UserModel.create(props, { transaction: trx })

    return user.get({ plain: true })
  }

  async delete(props: IInputDeleteUserDto, trx?: ITransaction): Promise<void> {
    await UserModel.destroy({
      where: {
        id: props.id,
      },
      transaction: trx,
    })

    return void 0
  }

  async findBy(input: IInputFindUserByDto): Promise<IUserEntity> {
    const options = createFindAllOptions(input)

    const user = await UserModel.findOne(options)

    if (!user) {
      return void 0
    }

    return user.get({ plain: true })
  }
}
