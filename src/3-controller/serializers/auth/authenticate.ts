// import { IInputAuthenticateDto } from '@business/dto/auth/authenticateDto'
// import { IsEmail, IsNotEmpty, IsString } from 'class-validator'
// import { AbstractSerializer } from '../abstractSerializer'

// export type IInputAuthenticateOperator = Omit<
//   IInputAuthenticateDto,
//   'student'
// > & {
//   email: string
// }

// export class InputAuthenticate extends AbstractSerializer<IInputAuthenticateDto> {
//   @IsEmail()
//   @IsNotEmpty()
//   email: string

//   @IsNotEmpty()
//   @IsString()
//   password: string
// }
