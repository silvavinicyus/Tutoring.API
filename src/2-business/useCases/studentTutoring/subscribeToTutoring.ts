import {
  IInputSubscribeToTutoringDto,
  IOutputSubscribeToTutoringDto,
} from '@business/dto/studentTutoring/subscribeToTutoring'
import { ITransaction } from '@business/dto/transaction/create'
import {
  IStudentTutoringRepository,
  IStudentTutoringRepositoryToken,
} from '@business/repositories/studentTutoring/iStudentTutoringRepository'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import {
  IInputStudentTutoringEntity,
  StudentTutoringEntity,
} from '@domain/entities/student-tutoring'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class SubscribeToTutoringUseCase
  implements
    IAbstractUseCase<
      IInputSubscribeToTutoringDto,
      IOutputSubscribeToTutoringDto
    >
{
  constructor(
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifier: IUniqueIdentifierService,
    @inject(IStudentTutoringRepositoryToken)
    private studentTutoringRepository: IStudentTutoringRepository
  ) {}

  async exec(
    props: IInputStudentTutoringEntity,
    trx?: ITransaction
  ): Promise<IOutputSubscribeToTutoringDto> {
    const studentTutoringEntity = StudentTutoringEntity.create(
      props,
      new Date()
    )

    const studentTutoringResult =
      await this.studentTutoringRepository.subscribe(
        {
          ...studentTutoringEntity.value.export(),
          uuid: this.uniqueIdentifier.create(),
        },
        trx
      )

    return studentTutoringResult
  }
}
