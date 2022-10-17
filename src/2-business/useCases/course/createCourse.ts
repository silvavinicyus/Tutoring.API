import {
  IInputCreateCourseDto,
  IOutputCreateCourseDto,
} from '@business/dto/course/createCourseDto'
import { ITransaction } from '@business/dto/transaction/create'
import {
  ICourseRepository,
  ICourseRepositoryToken,
} from '@business/repositories/course/iCourseRepository'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { CourseEntity } from '@domain/entities/course'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateCourseUseCase
  implements IAbstractUseCase<IInputCreateCourseDto, IOutputCreateCourseDto>
{
  constructor(
    @inject(ICourseRepositoryToken)
    private courseRepository: ICourseRepository,
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifier: IUniqueIdentifierService
  ) {}

  async exec(
    props: IInputCreateCourseDto,
    trx?: ITransaction
  ): Promise<IOutputCreateCourseDto> {
    const courseEntity = CourseEntity.create(props, new Date())
    const courseResult = await this.courseRepository.create(
      {
        ...courseEntity.value.export(),
        uuid: this.uniqueIdentifier.create(),
      },
      trx
    )
    return courseResult
  }
}
