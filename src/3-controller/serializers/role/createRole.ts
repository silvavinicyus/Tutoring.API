import { IInputCreateRoleDto } from '@business/dto/role/createRole'
import { IsNotEmpty, IsString } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputCreateRole extends AbstractSerializer<IInputCreateRoleDto> {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsString()
  description: string
}
