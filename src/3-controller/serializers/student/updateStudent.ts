import { IInputUpdateStudentDto } from '@business/dto/student/updateStudentDto'
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputUpdateStudent extends AbstractSerializer<IInputUpdateStudentDto> {
  @IsUUID()
  @IsNotEmpty()
  uuid: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name: string

  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  period: number

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  records_url: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  device_token: string

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  img_url: string
}
