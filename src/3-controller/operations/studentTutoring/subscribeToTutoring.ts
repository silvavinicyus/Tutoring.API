import { IAuthorizer } from '@business/dto/role/authorize'
import { IOutputSubscribeToTutoringDto } from '@business/dto/studentTutoring/subscribeToTutoring'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
import { FindStudentByUuidUseCase } from '@business/useCases/student/findStudentByUuid'
import { SubscribeToTutoringUseCase } from '@business/useCases/studentTutoring/subscribeToTutoring'
import { FindTutoringByUuidUseCase } from '@business/useCases/tutoring/showTutoring'
import { InputSubscribeToTutoring } from '@controller/serializers/tutoringStudent/subscribeToTutoring'
import { IStatusStudentTutoring } from '@domain/entities/student-tutoring'
import { STUDENT } from '@shared/constants'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class SubscribeToTutoringOperator extends AbstractOperator<
  InputSubscribeToTutoring,
  IOutputSubscribeToTutoringDto
> {
  constructor(
    @inject(SubscribeToTutoringUseCase)
    private subscribeToTutoring: SubscribeToTutoringUseCase,
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
    input: InputSubscribeToTutoring,
    authorizer: IAuthorizer
  ): Promise<IOutputSubscribeToTutoringDto> {
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

    const studentTutoring = await this.subscribeToTutoring.exec({
      status: IStatusStudentTutoring.ANALISYS,
      student_id: student.value.id,
      tutoring_id: tutoring.value.id,
    })
    if (studentTutoring.isLeft()) {
      return left(studentTutoring.value)
    }

    return studentTutoring
  }
}
