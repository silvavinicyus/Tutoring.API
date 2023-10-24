import { IInputDeleteManyPermissionsDto } from '@business/dto/permission/deleteMany'
import { IInputFindByPermissionDto } from '@business/dto/permission/findBy'
import {
  IInputUpdatePermission,
  IPermissionRepository,
} from '@business/repositories/permission/iPermissionRepository'
import { IPermissionEntity } from '@domain/entities/permission'
import { PermissionModel } from '@framework/models/permission'
import { createFindAllOptions } from '@framework/utility/repositoryUtils'
import { injectable } from 'inversify'
import { Op } from 'sequelize'
import { ITransaction } from './transaction'

@injectable()
export class PermissionRepository implements IPermissionRepository {
  async createMany(
    props: IPermissionEntity[],
    trx?: ITransaction
  ): Promise<IPermissionEntity[]> {
    const permission = await PermissionModel.bulkCreate(props, {
      transaction: trx,
    })

    return permission.map((permission) => permission.get({ plain: true }))
  }

  async findBy(props: IInputFindByPermissionDto): Promise<IPermissionEntity> {
    const options = createFindAllOptions(props)

    const permission = await PermissionModel.findOne(options)

    if (!permission) {
      return void 0
    }

    return permission.get({ plain: true })
  }

  async deleteMany(
    props: IInputDeleteManyPermissionsDto,
    trx?: ITransaction
  ): Promise<void> {
    await PermissionModel.destroy({
      where: {
        id: {
          [Op.in]: props.ids,
        },
      },
      transaction: trx,
    })

    return void 0
  }

  async update(
    props: IInputUpdatePermission,
    trx?: ITransaction
  ): Promise<Partial<IPermissionEntity>> {
    await PermissionModel.update(props.newData, {
      where: {
        [props.updateWhere.value]: props.updateWhere.value,
      },
      transaction: trx,
    })

    return props.newData as IPermissionEntity
  }
}
