import { IAuthorizer } from '@business/dto/role/authorize'
import { IOutputCreateTutoringDto } from '@business/dto/tutoring/createTutoringDto'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { CreateTutoringUseCase } from '@business/useCases/tutoring/createTutoring'
import { InputCreateTutoring } from '@controller/serializers/tutoring/createTutoring'
import { TEACHER } from '@shared/constants'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class CreateTutoringOperator extends AbstractOperator<
  InputCreateTutoring,
  IOutputCreateTutoringDto
> {
  constructor(
    @inject(CreateTutoringUseCase)
    private createTutoring: CreateTutoringUseCase,
    @inject(VerifyProfileUseCase)
    private verifyProfile: VerifyProfileUseCase
  ) {
    super()
  }

  async run(
    input: InputCreateTutoring,
    authorizer: IAuthorizer
  ): Promise<IOutputCreateTutoringDto> {
    const authUserResult = await this.verifyProfile.exec({
      user: authorizer,
      roles: [TEACHER],
    })

    if (authUserResult.isLeft()) {
      return left(authUserResult.value)
    }

    this.exec(input)

    const tutoringResult = await this.createTutoring.exec({
      ...input,
    })
  }
}
