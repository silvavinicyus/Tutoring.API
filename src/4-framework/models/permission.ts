import { IPermissionEntity } from '@domain/entities/permission'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utility/database'

export class PermissionModel extends Model<IPermissionEntity> {}

PermissionModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permission_group: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'permissions',
    modelName: 'permissions',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)
