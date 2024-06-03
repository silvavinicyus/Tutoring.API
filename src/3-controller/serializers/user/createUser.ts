import { IInputCreateUserDto } from '@business/dto/user/create'
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputCreateUser extends AbstractSerializer<IInputCreateUserDto> {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string

  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone: string

  @IsDate()
  @IsNotEmpty()
  @IsOptional()
  birthdate: Date

  @IsString()
  @IsNotEmpty()
  @Length(8)
  @IsOptional()
  password: string

  @IsNumber()
  @IsNotEmpty()
  user_real_id: number

  @IsUUID('4')
  @IsNotEmpty()
  user_real_uuid: string
}
