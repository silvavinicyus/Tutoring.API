import {
  IInputGetAllStudentsDto,
  IOutputGetAllStudents,
} from '@business/dto/student/getAllStudentsDto'
import {
  IStudentRepository,
  IStudentRepositoryToken,
} from '@business/repositories/student/iStudentRepository'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class GetAllStudentsUseCase
  implements IAbstractUseCase<IInputGetAllStudentsDto, IOutputGetAllStudents>
{
  constructor(
    @inject(IStudentRepositoryToken)
    private studentRepository: IStudentRepository
  ) {}

  async exec(props: IInputGetAllStudentsDto): Promise<IOutputGetAllStudents> {
    const students = await this.studentRepository.getAll(
      props.page,
      props.limit
    )

    return students
  }
}
