import { IStudentTutoringEntity } from '@domain/entities/student-tutoring'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utility/database'

export class StudentTutoringModel extends Model<IStudentTutoringEntity> {}

StudentTutoringModel.init(
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
    tutoring_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        key: 'id',
        model: 'tutoring_history',
      },
    },
    student_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        key: 'id',
        model: 'student_history',
      },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: 'student_tutoring',
    modelName: 'student_tutoring',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)
