import { IInputFindStudentByUuidDto } from '@business/dto/student/findStudentByUuidDto'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputShowStudent extends AbstractSerializer<IInputFindStudentByUuidDto> {
  @IsUUID()
  @IsNotEmpty()
  uuid: string
}
