import { IInputCreateMajorDto } from '@business/dto/major/createMajorDto'
import { IShift } from '@domain/entities/major'
import { IsEnum, IsNotEmpty, IsString } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputCreateMajor extends AbstractSerializer<IInputCreateMajorDto> {
  @IsNotEmpty()
  @IsString()
  name: string

  @IsNotEmpty()
  @IsEnum(IShift)
  shift: IShift
}
