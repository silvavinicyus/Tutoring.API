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
    const allowedPermissions = [...input.permissions, 'admin']

    const userPermissions = input.user.permissions.split(',')

    if (
      !allowedPermissions.some((element) => userPermissions.includes(element))
    ) {
      return left(RolesErrors.notAllowed())
    }

    return right({
      ...input.user,
    })
  }
}
