import {
  IInputFindCourseByUuidDto,
  IOutputFindCourseByUuidDto,
} from '@business/dto/course/findCourseByUuidDto'
import {
  ICourseRepository,
  ICourseRepositoryToken,
} from '@business/repositories/course/iCourseRepository'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class FindCourseByUuidUseCase
  implements
    IAbstractUseCase<IInputFindCourseByUuidDto, IOutputFindCourseByUuidDto>
{
  constructor(
    @inject(ICourseRepositoryToken)
    private courseRepository: ICourseRepository
  ) {}

  async exec(
    props: IInputFindCourseByUuidDto
  ): Promise<IOutputFindCourseByUuidDto> {
    const courseResult = await this.courseRepository.findByUuid(props)

    return courseResult
  }
}
