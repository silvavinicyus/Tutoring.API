import { IInputDeleteUserDto } from '@business/dto/user/delete'
import { IsNotEmpty, IsNumber } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputDeleteUser extends AbstractSerializer<IInputDeleteUserDto> {
  @IsNumber()
  @IsNotEmpty()
  id: number
}
