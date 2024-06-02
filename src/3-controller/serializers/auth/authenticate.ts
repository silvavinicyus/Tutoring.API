import { IInputAuthenticateDto } from '@business/dto/auth/authenticateDto'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export type IInputAuthenticateOperator = Omit<IInputAuthenticateDto, 'user'> & {
  email: string
}

export class InputAuthenticate extends AbstractSerializer<IInputAuthenticateOperator> {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @IsString()
  password: string
}
