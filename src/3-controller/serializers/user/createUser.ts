import { IInputCreateUserDto } from '@business/dto/user/create'
import { IsDate, IsEmail, IsNotEmpty, IsString, Length } from 'class-validator'
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
}
