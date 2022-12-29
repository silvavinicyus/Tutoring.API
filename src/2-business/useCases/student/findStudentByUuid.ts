import {
  IInputFindStudentByUuidDto,
  IOutputFindStudentByUuidDto,
} from '@business/dto/student/findStudentByUuidDto'
import {
  IStudentRepository,
  IStudentRepositoryToken,
} from '@business/repositories/student/iStudentRepository'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class FindStudentByUuidUseCase
  implements
    IAbstractUseCase<IInputFindStudentByUuidDto, IOutputFindStudentByUuidDto>
{
  constructor(
    @inject(IStudentRepositoryToken)
    private studentRepository: IStudentRepository
  ) {}

  async exec(
    props: IInputFindStudentByUuidDto
  ): Promise<IOutputFindStudentByUuidDto> {
    const student = await this.studentRepository.findByUuid(props)

    return student
  }
}
