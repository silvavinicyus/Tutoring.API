import { IInputFindTutoringByUuidDto } from '@business/dto/tutoring/findTutoringByUuidDto'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputShowTutoring extends AbstractSerializer<IInputFindTutoringByUuidDto> {
  @IsUUID()
  @IsNotEmpty()
  uuid: string
}
