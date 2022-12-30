import { IOutputFindCourseByUuidDto } from '@business/dto/course/findCourseByUuidDto'
import { FindCourseByUuidUseCase } from '@business/useCases/course/findCourseByUuid'
import { InputShowCourse } from '@controller/serializers/course/showCourse'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class ShowCourseOperator extends AbstractOperator<
  InputShowCourse,
  IOutputFindCourseByUuidDto
> {
  constructor(
    @inject(FindCourseByUuidUseCase)
    private findCourse: FindCourseByUuidUseCase
  ) {
    super()
  }

  async run(input: InputShowCourse): Promise<IOutputFindCourseByUuidDto> {
    this.exec(input)

    const course = await this.findCourse.exec({ ...input })

    if (course.isLeft()) {
      return left(course.value)
    }

    return course
  }
}
