import { IRolePermissionEntity } from '@domain/entities/rolePermission'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utility/database'

export class RolePermissionModel extends Model<IRolePermissionEntity> {}

RolePermissionModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    permission_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'role_permission',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)
