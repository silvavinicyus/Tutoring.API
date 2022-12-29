import {
  IInputDeleteStudentDto,
  IOutputDeleteStudentDto,
} from '@business/dto/student/deleteStudentDto'
import {
  IStudentRepository,
  IStudentRepositoryToken,
} from '@business/repositories/student/iStudentRepository'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class DeleteStudentUseCase
  implements IAbstractUseCase<IInputDeleteStudentDto, IOutputDeleteStudentDto>
{
  constructor(
    @inject(IStudentRepositoryToken)
    private studentRepository: IStudentRepository
  ) {}

  async exec(props: IInputDeleteStudentDto): Promise<IOutputDeleteStudentDto> {
    const student = await this.studentRepository.delete(props)

    return student
  }
}
