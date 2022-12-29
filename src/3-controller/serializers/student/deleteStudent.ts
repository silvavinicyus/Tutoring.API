import { IInputDeleteStudentDto } from '@business/dto/student/deleteStudentDto'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export type IInputDeleteStudentDtoOperator = Omit<
  IInputDeleteStudentDto,
  'id'
> & {
  uuid: string
}

export class InputDeleteStudent extends AbstractSerializer<IInputDeleteStudentDtoOperator> {
  @IsUUID()
  @IsNotEmpty()
  uuid: string
}
