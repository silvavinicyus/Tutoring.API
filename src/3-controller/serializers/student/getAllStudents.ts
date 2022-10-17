import { IInputGetAllStudentsDto } from '@business/dto/student/getAllStudentsDto'
import { IsNotEmpty, IsNumber } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputGetAllStudents extends AbstractSerializer<IInputGetAllStudentsDto> {
  @IsNumber()
  @IsNotEmpty()
  page: number

  @IsNumber()
  @IsNotEmpty()
  limit: number
}
