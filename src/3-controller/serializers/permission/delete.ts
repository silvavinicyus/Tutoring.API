import { IInputDeleteManyPermissionsDto } from '@business/dto/permission/deleteMany'
import { IsArray } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputDeletePermission extends AbstractSerializer<IInputDeleteManyPermissionsDto> {
  @IsArray()
  ids: number[]
}
