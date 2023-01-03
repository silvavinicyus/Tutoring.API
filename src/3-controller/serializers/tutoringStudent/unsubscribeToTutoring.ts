import { IInputSubscribeToTutoringDto } from '@business/dto/studentTutoring/subscribeToTutoring'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export type IInputUnsubscribeToTutoringOperator = Omit<
  IInputSubscribeToTutoringDto,
  'student_id' | 'tutoring_id'
> & {
  tutoring_uuid: string
}

export class InputUnsubscribeToTutoring extends AbstractSerializer<IInputUnsubscribeToTutoringOperator> {
  @IsUUID()
  @IsNotEmpty()
  tutoring_uuid: string
}
