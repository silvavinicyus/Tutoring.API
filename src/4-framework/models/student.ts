import { IStudentEntity } from '@domain/entities/student'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utility/database'
import { RoleModel } from './role'

export class StudentModel extends Model<IStudentEntity> {}

StudentModel.init(
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
    registration_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cpf: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    major_id: {
      type: DataTypes.NUMBER,
      allowNull: true,
      references: {
        key: 'id',
        model: 'major_history',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    role_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        key: 'id',
        model: 'role_history',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    period: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    device_token: {
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: 'student_history',
    modelName: 'student_history',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)

StudentModel.belongsTo(RoleModel, {
  foreignKey: 'role_id',
  as: 'role',
  onUpdate: 'CASCADE',
  onDelete: 'CASCADE',
})
