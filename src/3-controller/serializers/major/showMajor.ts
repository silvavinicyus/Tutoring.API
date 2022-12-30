import { IInputFindMajorByUuidDto } from '@business/dto/major/findMajorByUuidDto'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputShowMajor extends AbstractSerializer<IInputFindMajorByUuidDto> {
  @IsUUID()
  @IsNotEmpty()
  uuid: string
}
