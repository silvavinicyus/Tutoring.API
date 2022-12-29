import { IInputCreateTutoringDto } from '@business/dto/tutoring/createTutoringDto'
import { IStatusTutoring } from '@domain/entities/tutoring'
import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export type IInputCreateTutoringDtoOperator = Omit<
  IInputCreateTutoringDto,
  'major_id' | 'course_id'
> & {
  course_uuid: string
  major_uuid: string
}

export class InputCreateTutoring extends AbstractSerializer<IInputCreateTutoringDto> {
  @IsNotEmpty()
  @IsUUID()
  course_uuid: string

  @IsNotEmpty()
  @IsUUID()
  major_uuid: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsNumber()
  vacancy_number: number

  @IsNotEmpty()
  @IsBoolean()
  with_payment: boolean

  @IsOptional()
  @IsNumber()
  payment_value: number

  @IsNotEmpty()
  @IsEnum(IStatusTutoring)
  status: IStatusTutoring
}
