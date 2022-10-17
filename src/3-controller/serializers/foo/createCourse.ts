import { IInputCreateCourseDto } from '@business/dto/course/createCourseDto'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputCreateCourse extends AbstractSerializer<IInputCreateCourseDto> {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  period: number
}
