import { IOutputCreateMajorDto } from '@business/dto/major/createMajorDto'
import { IAuthorizer } from '@business/dto/role/authorize'
import { CreateMajorUseCase } from '@business/useCases/major/createMajor'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { InputCreateMajor } from '@controller/serializers/major/createMajor'
import { TEACHER } from '@shared/constants'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class CreateMajorOperator extends AbstractOperator<
  InputCreateMajor,
  IOutputCreateMajorDto
> {
  constructor(
    @inject(CreateMajorUseCase)
    private createMajor: CreateMajorUseCase,
    @inject(VerifyProfileUseCase)
    private verifyProfile: VerifyProfileUseCase
  ) {
    super()
  }

  async run(
    input: InputCreateMajor,
    authorizer: IAuthorizer
  ): Promise<IOutputCreateMajorDto> {
    const authUserResult = await this.verifyProfile.exec({
      user: authorizer,
      roles: [TEACHER],
    })

    if (authUserResult.isLeft()) {
      return left(authUserResult.value)
    }

    this.exec(input)

    const majorResult = await this.createMajor.exec({
      ...input,
    })

    if (majorResult.isLeft()) {
      return left(majorResult.value)
    }

    return majorResult
  }
}
