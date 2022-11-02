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
  IEncryptionService,
  IEncryptionServiceToken,
} from '@business/services/encryption/iEncryption'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { StudentMap } from '@business/utils/studentMapper'
import { IInputStundentEntity, StudentEntity } from '@domain/entities/student'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateStudentUseCase
  implements IAbstractUseCase<IInputCreateStudentDto, IOutputCreateStudentDto>
{
  constructor(
    @inject(IStudentRepositoryToken)
    private studentRepository: IStudentRepository,
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifier: IUniqueIdentifierService,
    @inject(IEncryptionServiceToken)
    private encryptionService: IEncryptionService
  ) {}

  async exec(
    props: IInputStundentEntity,
    trx?: ITransaction
  ): Promise<IOutputCreateStudentDto> {
    const hashedPassword = await this.encryptionService.createPasswordHash(
      props.password
    )

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

    if (studentResult.isLeft()) {
      return left(studentResult.value)
    }

    return right(StudentMap.toDtoWithoutPassword(studentResult.value))
  }
}
