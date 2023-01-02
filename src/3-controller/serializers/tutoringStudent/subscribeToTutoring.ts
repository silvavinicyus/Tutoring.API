import { IInputSubscribeToTutoringDto } from '@business/dto/studentTutoring/subscribeToTutoring'
import { IStatusStudentTutoring } from '@domain/entities/student-tutoring'
import { IsEnum, IsNotEmpty, IsUUID } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export type IInputSubscribeToTutoringOperatorDto = Omit<
  IInputSubscribeToTutoringDto,
  'student_id' | 'tutoring_id'
> & {
  tutoring_uuid: string
}

export class InputSubscribeToTutoring extends AbstractSerializer<IInputSubscribeToTutoringOperatorDto> {
  @IsUUID()
  @IsNotEmpty()
  tutoring_uuid: string

  @IsEnum(IStatusStudentTutoring)
  @IsNotEmpty()
  status: IStatusStudentTutoring
}
