import { IUserEntity } from '@domain/entities/user'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utility/database'
import { RoleModel } from './role'
import { FileModel } from './file'
import { PermissionModel } from './permission'
import { RolePermissionModel } from './rolePermission'

export class UserModel extends Model<IUserEntity> {}

UserModel.init(
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
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    image_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    user_real_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    user_real_uuid: {
      type: DataTypes.STRING(40),
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
    tableName: 'users',
    modelName: 'users',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)

UserModel.hasOne(RoleModel, {
  foreignKey: 'id',
  sourceKey: 'role_id',
  as: 'role',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})

UserModel.hasOne(FileModel, {
  foreignKey: 'id',
  sourceKey: 'image_id',
  as: 'image',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})

PermissionModel.belongsToMany(RoleModel, {
  through: RolePermissionModel,
  as: 'roles',
  foreignKey: 'permission_id',
})

RoleModel.belongsToMany(PermissionModel, {
  through: RolePermissionModel,
  as: 'permissions',
  foreignKey: 'role_id',
})
