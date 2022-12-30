import { IAuthorizer } from '@business/dto/role/authorize'
import { IOutputCreateTutoringDto } from '@business/dto/tutoring/createTutoringDto'
import { FindCourseByUuidUseCase } from '@business/useCases/course/findCourseByUuid'
import { FindMajorByUuidUseCase } from '@business/useCases/major/findMajorByUuid'
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
    private verifyProfile: VerifyProfileUseCase,
    @inject(FindMajorByUuidUseCase)
    private findMajor: FindMajorByUuidUseCase,
    @inject(FindCourseByUuidUseCase)
    private findCourse: FindCourseByUuidUseCase
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

    const major = await this.findMajor.exec({ uuid: input.major_uuid })
    if (major.isLeft()) {
      return left(major.value)
    }

    const course = await this.findCourse.exec({ uuid: input.course_uuid })
    if (course.isLeft()) {
      return left(course.value)
    }

    const tutoringResult = await this.createTutoring.exec({
      ...input,
      course_id: course.value.id,
      major_id: major.value.id,
    })

    if (tutoringResult.isLeft()) {
      return left(tutoringResult.value)
    }

    return tutoringResult
  }
}
