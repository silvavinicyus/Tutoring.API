import {
  IInputVerifyProfileDto,
  IOutputVerifyProfileDto,
} from '@business/dto/role/authorize'
import { injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class VerifyProfileUseCase
  implements IAbstractUseCase<IInputVerifyProfileDto, IOutputVerifyProfileDto>
{
  async exec(input: IInputVerifyProfileDto): Promise<IOutputVerifyProfileDto> {
    const allowed_roles = [...input.roles, 'admin_role']
  }
}
