import {
  IInputCreateMajorDto,
  IOutputCreateMajorDto,
} from '@business/dto/major/createMajorDto'
import { ITransaction } from '@business/dto/transaction/create'
import {
  IMajorRepository,
  IMajorRepositoryToken,
} from '@business/repositories/major/iMajorRepository'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { IInputMajorEntity, MajorEntity } from '@domain/entities/major'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class CreateMajorUseCase
  implements IAbstractUseCase<IInputCreateMajorDto, IOutputCreateMajorDto>
{
  constructor(
    @inject(IMajorRepositoryToken)
    private majorRepository: IMajorRepository,
    @inject(IUniqueIdentifierServiceToken)
    private uniqueIdentifier: IUniqueIdentifierService
  ) {}

  async exec(
    props: IInputMajorEntity,
    trx?: ITransaction
  ): Promise<IOutputCreateMajorDto> {
    const majorEntity = MajorEntity.create(props, new Date())

    const majorResult = await this.majorRepository.create(
      {
        ...majorEntity.value.export(),
        uuid: this.uniqueIdentifier.create(),
      },
      trx
    )

    return majorResult
  }
}
