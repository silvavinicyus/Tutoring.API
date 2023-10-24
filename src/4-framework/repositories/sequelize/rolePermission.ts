import { IInputDeleteManyRolePermissionDto } from '@business/dto/rolePermission/deleteMany'
import { IRolePermissionRepository } from '@business/repositories/rolePermission/iRolePermissionRepository'
import { IRolePermissionEntity } from '@domain/entities/rolePermission'
import { injectable } from 'inversify'
import { RolePermissionModel } from '@framework/models/rolePermission'
import { Op } from 'sequelize'
import { ITransaction } from './transaction'

@injectable()
export class RolePermissionRepository implements IRolePermissionRepository {
  async createMany(
    input: IRolePermissionEntity[],
    trx?: ITransaction
  ): Promise<IRolePermissionEntity[]> {
    const rolePermissions = await RolePermissionModel.bulkCreate(input, {
      transaction: trx,
    })

    return rolePermissions.map((rp) => rp.get({ plain: true }))
  }

  async deleteMany(
    input: IInputDeleteManyRolePermissionDto,
    trx?: ITransaction
  ): Promise<void> {
    await RolePermissionModel.destroy({
      where: {
        permission_id: {
          [Op.in]: input.permissions,
        },
        role_id: input.role_id,
      },
      transaction: trx,
    })

    return void 0
  }
}
