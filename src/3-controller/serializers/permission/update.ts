import { IInputUpdatePermissionDto } from '@business/dto/permission/update'
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

interface IInputUpdatePermissionProps extends IInputUpdatePermissionDto {
  uuid: string
}

export class InputUpdatePermission extends AbstractSerializer<IInputUpdatePermissionProps> {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsString()
  description: string

  @IsOptional()
  @IsString()
  permission_group: string

  @IsUUID('4')
  @IsNotEmpty()
  uuid: string
}
