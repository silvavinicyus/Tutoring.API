import { IInputCreateUserDto } from '@business/dto/user/create'
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputCreateUser extends AbstractSerializer<IInputCreateUserDto> {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  phone: string

  @IsDate()
  @IsNotEmpty()
  birthdate: Date

  @IsString()
  @IsNotEmpty()
  @Length(8)
  password: string

  @IsNumber()
  @IsNotEmpty()
  user_real_id: number

  @IsUUID('4')
  @IsNotEmpty()
  user_real_uuid: string
}
