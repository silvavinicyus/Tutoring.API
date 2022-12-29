import {
  IInputFindStudentByEmailDto,
  IOutputFindStudentByEmailDto,
} from '@business/dto/student/findStudentByEmailDto'
import {
  IStudentRepository,
  IStudentRepositoryToken,
} from '@business/repositories/student/iStudentRepository'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class FindStudentByEmailUseCase
  implements
    IAbstractUseCase<IInputFindStudentByEmailDto, IOutputFindStudentByEmailDto>
{
  constructor(
    @inject(IStudentRepositoryToken)
    private studentRepository: IStudentRepository
  ) {}

  async exec(
    props: IInputFindStudentByEmailDto
  ): Promise<IOutputFindStudentByEmailDto> {
    const student = await this.studentRepository.findByEmail(props)

    return student
  }
}
