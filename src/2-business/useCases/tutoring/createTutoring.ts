import { ITransaction } from '@business/dto/transaction/create'
import {
  IInputCreateTutoringDto,
  IOutputCreateTutoringDto,
} from '@business/dto/tutoring/createTutoringDto'
import {
  ITutoringRepository,
  ITutoringRepositoryToken,
} from '@business/repositories/tutoring/iTutoringRepository'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { IInputTutoringEntity, TutoringEntity } from '@domain/entities/tutoring'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateTutoringUseCase
  implements
    IAbstractUseCase<IInputCreateTutoringDto, IOutputCreateTutoringDto>
{
  constructor(
    @inject(ITutoringRepositoryToken)
    private tutoringRepository: ITutoringRepository,
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifier: IUniqueIdentifierService
  ) {}

  async exec(
    props: IInputTutoringEntity,
    trx?: ITransaction
  ): Promise<IOutputCreateTutoringDto> {
    const tutoringEntity = TutoringEntity.create(props, new Date())
    const tutoringResult = await this.tutoringRepository.create(
      {
        ...tutoringEntity.value.export(),
        uuid: this.uniqueIdentifier.create(),
      },
      trx
    )

    return tutoringResult
  }
}
