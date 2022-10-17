import {
  IInputUpdateStudentDto,
  IOutputUpdateStudentDto,
} from '@business/dto/student/updateStudentDto'
import { ITransaction } from '@business/dto/transaction/create'
import {
  IStudentRepository,
  IStudentRepositoryToken,
} from '@business/repositories/student/iStudentRepository'
import { StudentEntity } from '@domain/entities/student'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class UpdateStudentUseCase
  implements IAbstractUseCase<IInputUpdateStudentDto, IOutputUpdateStudentDto>
{
  constructor(
    @inject(IStudentRepositoryToken)
    private studentRepository: IStudentRepository
  ) {}

  async exec(
    props: IInputUpdateStudentDto,
    trx?: ITransaction
  ): Promise<IOutputUpdateStudentDto> {
    const studentEntity = StudentEntity.update(props, new Date())

    const studentResult = await this.studentRepository.update(
      studentEntity.value.export(),
      trx
    )

    return studentResult
  }
}
