import { IUserEntity } from '@domain/entities/user'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utility/database'
import { RoleModel } from './role'

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
  as: 'role',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})
