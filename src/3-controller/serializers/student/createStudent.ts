import { IInputCreateStudentDto } from '@business/dto/student/createStudentDto'
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputCreateStudent extends AbstractSerializer<IInputCreateStudentDto> {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  registration_number: string

  @IsString()
  @IsNotEmpty()
  cpf: string

  @IsNumber()
  @IsNotEmpty()
  major_id: number

  @IsNumber()
  @IsNotEmpty()
  period: number

  @IsString()
  @IsNotEmpty()
  records_url: string

  @IsString()
  @IsNotEmpty()
  device_token: string
}
