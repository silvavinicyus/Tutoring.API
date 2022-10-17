import { ICourseEntity } from '@domain/entities/course'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utility/database'
import { TutoringModel } from './tutoring'

export class CourseModel extends Model<ICourseEntity> {}

CourseModel.init(
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
    period: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    major_id: {
      type: DataTypes.NUMBER,
      allowNull: false,
      references: {
        key: 'id',
        model: 'major_history',
      },
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
    tableName: 'course_history',
    modelName: 'course_history',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)

CourseModel.hasMany(TutoringModel, {
  foreignKey: 'course_id',
  as: 'tutoring',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

TutoringModel.belongsTo(CourseModel, {
  foreignKey: 'id',
  as: 'course',
})
