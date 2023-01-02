import { IInputSubscribeToTutoringDto } from '@business/dto/studentTutoring/subscribeToTutoring'
import { IsNotEmpty, IsString, IsUUID } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export type IInputSubscribeToTutoringOperatorDto = Omit<
  IInputSubscribeToTutoringDto,
  'student_id' | 'tutoring_id' | 'status'
> & {
  tutoring_uuid: string
}

export class InputSubscribeToTutoring extends AbstractSerializer<IInputSubscribeToTutoringOperatorDto> {
  @IsUUID()
  @IsNotEmpty()
  tutoring_uuid: string

  @IsString()
  @IsNotEmpty()
  records_url: string
}
