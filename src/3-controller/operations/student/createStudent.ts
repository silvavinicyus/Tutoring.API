import { IAuthorizer } from '@business/dto/role/authorize'
import { IOutputCreateStudentDto } from '@business/dto/student/createStudentDto'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { CreateStudentUseCase } from '@business/useCases/student/createStudent'
import { InputCreateStudent } from '@controller/serializers/student/createStudent'
import { TEACHER } from '@shared/constants'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class CreateStudentOperator extends AbstractOperator<
  InputCreateStudent,
  IOutputCreateStudentDto
> {
  constructor(
    @inject(CreateStudentUseCase)
    private createStudent: CreateStudentUseCase,
    @inject(VerifyProfileUseCase)
    private verifyProfile: VerifyProfileUseCase
  ) {
    super()
  }

  async run(
    input: InputCreateStudent,
    authorizer: IAuthorizer
  ): Promise<IOutputCreateStudentDto> {
    const authUserResult = await this.verifyProfile.exec({
      user: authorizer,
      roles: [TEACHER],
    })

    if (authUserResult.isLeft()) {
      return left(authUserResult.value)
    }

    this.exec(input)

    const studentResult = await this.createStudent.exec({
      ...input,
      role_id: 3,
    })

    if (studentResult.isLeft()) {
      return left(studentResult.value)
    }

    return studentResult
  }
}
