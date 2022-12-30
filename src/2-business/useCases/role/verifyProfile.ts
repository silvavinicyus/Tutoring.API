import {
  IInputVerifyProfileDto,
  IOutputVerifyProfileDto,
} from '@business/dto/role/authorize'
import { RolesErrors } from '@business/module/errors/rolesErrors'
import { left, right } from '@shared/either'
import { injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class VerifyProfileUseCase
  implements IAbstractUseCase<IInputVerifyProfileDto, IOutputVerifyProfileDto>
{
  async exec(input: IInputVerifyProfileDto): Promise<IOutputVerifyProfileDto> {
    const allowed_roles = [...input.roles, 'admin_role']
    console.log(allowed_roles, input.user.role)
    if (!allowed_roles.includes(input.user.role)) {
      return left(RolesErrors.notAllowed())
    }

    return right({
      ...input.user,
    })
  }
}
