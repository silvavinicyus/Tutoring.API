import { IStudentEntity } from '@domain/entities/student'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utility/database'

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
    cpf: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    imgUrl: {
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
    },
    period: {
      type: DataTypes.NUMBER,
      allowNull: true,
    },
    records_url: {
      type: DataTypes.STRING,
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
