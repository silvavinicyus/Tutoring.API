import { IRoleEntity } from '@domain/entities/role'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utility/database'

export class RoleModel extends Model<IRoleEntity> {}

RoleModel.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    uuid: {
      type: DataTypes.STRING(40),
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'roles',
    modelName: 'roles',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)
