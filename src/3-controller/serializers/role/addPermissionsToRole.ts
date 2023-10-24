import { IInputCreateManyRolePermissionsDto } from '@business/dto/rolePermission/createMany'
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputAddPermissionsToRole extends AbstractSerializer<IInputCreateManyRolePermissionsDto> {
  @IsNumber()
  @IsNotEmpty()
  role_id: number

  @IsArray()
  permissions: number[]
}
