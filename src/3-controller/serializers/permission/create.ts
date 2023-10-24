import { IInputPermissionEntity } from '@domain/entities/permission'
import { IsNotEmpty, IsString, ValidateNested } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export type IInputCreatePermissionSerializer = IInputPermissionEntity

export class InputCreatePermission extends AbstractSerializer<IInputCreatePermissionSerializer> {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  @IsString()
  description: string

  @IsNotEmpty()
  @IsString()
  permission_group: string
}

export class InputCreateManyPermissions extends AbstractSerializer<{
  permissions: InputCreatePermission[]
}> {
  @ValidateNested({ each: true })
  permissions: InputCreatePermission[]
}
