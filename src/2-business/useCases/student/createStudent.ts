import {
  IInputCreateStudentDto,
  IOutputCreateStudentDto,
} from '@business/dto/student/createStudentDto'
import { ITransaction } from '@business/dto/transaction/create'
import {
  IStudentRepository,
  IStudentRepositoryToken,
} from '@business/repositories/student/iStudentRepository'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { IInputStundentEntity, StudentEntity } from '@domain/entities/student'
import { inject, injectable } from 'inversify'
import { hash } from 'bcrypt'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateStudentUseCase
  implements IAbstractUseCase<IInputCreateStudentDto, IOutputCreateStudentDto>
{
  constructor(
    @inject(IStudentRepositoryToken)
    private studentRepository: IStudentRepository,
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifier: IUniqueIdentifierService
  ) {}

  async exec(
    props: IInputStundentEntity,
    trx?: ITransaction
  ): Promise<IOutputCreateStudentDto> {
    const hashedPassword = await hash(props.password, 8)

    const studentEntity = StudentEntity.create(
      { ...props, password: hashedPassword },
      new Date()
    )

    const studentResult = await this.studentRepository.create(
      {
        ...studentEntity.value.export(),
        uuid: this.uniqueIdentifier.create(),
      },
      trx
    )

    return studentResult
  }
}
