import { IInputCreateUserDto } from '@business/dto/user/create'
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  MinLength,
} from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputCreateUser extends AbstractSerializer<IInputCreateUserDto> {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @IsString()
  @Length(11)
  cpf: string

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string
}
