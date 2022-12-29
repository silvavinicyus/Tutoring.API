import { IMajorEntity } from '@domain/entities/major'
import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../utility/database'
import { CourseModel } from './course'
import { StudentModel } from './student'
import { TutoringModel } from './tutoring'

export class MajorModel extends Model<IMajorEntity> {}

MajorModel.init(
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
    shift: {
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
    tableName: 'major_history',
    modelName: 'major_history',
    timestamps: false,
    underscored: true,
    sequelize,
  }
)

MajorModel.hasMany(CourseModel, {
  foreignKey: 'major_id',
  as: 'courses',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

CourseModel.belongsTo(MajorModel, {
  foreignKey: 'id',
  as: 'major',
})

MajorModel.hasMany(StudentModel, {
  foreignKey: 'major_id',
  as: 'students',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

StudentModel.belongsTo(MajorModel, {
  foreignKey: 'id',
  as: 'major',
})

MajorModel.hasMany(TutoringModel, {
  foreignKey: 'major_id',
  as: 'Tutoring',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
})

TutoringModel.belongsTo(MajorModel, {
  foreignKey: 'id',
  as: 'major',
})
