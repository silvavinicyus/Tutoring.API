import { IAuthorizer } from '@business/dto/role/authorize'
import { IOutputUnsubscribeToTutoringDto } from '@business/dto/studentTutoring/unsubscribeToTutoring'
import { TutoringErrors } from '@business/module/errors/tutoringErrors'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { FindStudentByUuidUseCase } from '@business/useCases/student/findStudentByUuid'
import { UnsubscribeToTutoringUseCase } from '@business/useCases/studentTutoring/unsubscribeToTutoring'
import { FindTutoringByUuidUseCase } from '@business/useCases/tutoring/showTutoring'
import { InputUnsubscribeToTutoring } from '@controller/serializers/tutoringStudent/unsubscribeToTutoring'
import { IStatusTutoring } from '@domain/entities/tutoring'
import { STUDENT } from '@shared/constants'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class UnsubscribeToTutoringOperator extends AbstractOperator<
  InputUnsubscribeToTutoring,
  IOutputUnsubscribeToTutoringDto
> {
  constructor(
    @inject(UnsubscribeToTutoringUseCase)
    private unsubscribeToTutoring: UnsubscribeToTutoringUseCase,
    @inject(VerifyProfileUseCase)
    private verifyProfile: VerifyProfileUseCase,
    @inject(FindStudentByUuidUseCase)
    private findStudent: FindStudentByUuidUseCase,
    @inject(FindTutoringByUuidUseCase)
    private findTutoring: FindTutoringByUuidUseCase
  ) {
    super()
  }

  async run(
    input: InputUnsubscribeToTutoring,
    authorizer: IAuthorizer
  ): Promise<IOutputUnsubscribeToTutoringDto> {
    const authUserResult = await this.verifyProfile.exec({
      user: authorizer,
      roles: [STUDENT],
    })

    if (authUserResult.isLeft()) {
      return left(authUserResult.value)
    }

    this.exec(input)

    const student = await this.findStudent.exec({ uuid: authorizer.uuid })
    if (student.isLeft()) {
      return left(student.value)
    }

    const tutoring = await this.findTutoring.exec({ uuid: input.tutoring_uuid })
    if (tutoring.isLeft()) {
      return left(tutoring.value)
    }

    if (tutoring.value.status === IStatusTutoring.CLOSED) {
      return left(TutoringErrors.impossibleToSubscribe())
    }

    const studentTutoringResult = await this.unsubscribeToTutoring.exec({
      student_id: student.value.id,
      tutoring_id: tutoring.value.id,
    })

    if (studentTutoringResult.isLeft()) {
      return left(studentTutoringResult.value)
    }

    return studentTutoringResult
  }
}
