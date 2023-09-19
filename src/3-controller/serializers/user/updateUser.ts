import { IInputUpdateUserDto } from '@business/dto/user/update'
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputUpdateUser extends AbstractSerializer<IInputUpdateUserDto> {
  @IsUUID()
  @IsNotEmpty()
  uuid: string

  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  phone: string

  @IsOptional()
  @IsDate()
  birthdate: Date
}
