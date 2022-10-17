import { IStudentCourseEntity } from '@domain/entities/student-course'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utility/database'

export class StudentCourseModel extends Model<IStudentCourseEntity> {}

StudentCourseModel.init(
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
    course_id: {
      type: DataTypes.NUMBER,
      allowNull: true,
      references: {
        key: 'id',
        model: 'course_history',
      },
    },
    student_id: {
      type: DataTypes.NUMBER,
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
    tableName: 'student_course',
    modelName: 'student_course',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)
