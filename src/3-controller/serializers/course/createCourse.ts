import { IInputCreateCourseDto } from '@business/dto/course/createCourseDto'
import { IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export type IInputCreateCourseDtoOperator = Omit<
  IInputCreateCourseDto,
  'major_id'
> & {
  major_uuid: string
}

export class InputCreateCourse extends AbstractSerializer<IInputCreateCourseDtoOperator> {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  period: number

  @IsUUID()
  @IsNotEmpty()
  major_uuid: string
}
