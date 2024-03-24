import { IRoleRepository } from '@business/repositories/role/iRoleRepository'
import { IRoleEntity } from '@domain/entities/role'
import { RoleModel } from '@framework/models/role'
import { injectable } from 'inversify'
import { ITransaction } from './transaction'

@injectable()
export class RoleRepository implements IRoleRepository {
  async create(props: IRoleEntity, trx?: ITransaction): Promise<IRoleEntity> {
    const role = await RoleModel.create(props, { transaction: trx })

    return role.get({ plain: true })
  }
}
