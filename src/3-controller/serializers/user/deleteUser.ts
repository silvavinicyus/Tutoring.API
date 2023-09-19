import { IInputDeleteUserDto } from '@business/dto/user/delete'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export type IInputDeleteUserDtoOperator = Omit<IInputDeleteUserDto, 'id'> & {
  uuid: string
}

export class InputDeleteUser extends AbstractSerializer<IInputDeleteUserDtoOperator> {
  @IsUUID('4')
  @IsNotEmpty()
  uuid: string
}
