import { IOutputCreateRoleDto } from '@business/dto/role/createRole'
import { CreateRoleUseCase } from '@business/useCases/role/createRole'
import { InputCreateRole } from '@controller/serializers/role/createRole'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class CreateRoleOperator extends AbstractOperator<
  InputCreateRole,
  IOutputCreateRoleDto
> {
  constructor(
    @inject(CreateRoleUseCase)
    private createRole: CreateRoleUseCase
  ) {
    super()
  }

  async run(input: InputCreateRole): Promise<IOutputCreateRoleDto> {
    this.exec(input)

    const role = await this.createRole.exec({ ...input })

    if (role.isLeft()) {
      return left(role.value)
    }

    return role
  }
}
