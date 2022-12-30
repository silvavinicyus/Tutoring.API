import { IInputFindTutoringByUuidDto, IOutputFindTutoringByUuidDto } from '@business/dto/tutoring/findTutoringByUuidDto'
import {
  ITutoringRepository,
  ITutoringRepositoryToken
} from '@business/repositories/tutoring/iTutoringRepository'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class FindTutoringByUuidUseCase
  implements IAbstractUseCase<IInputFindTutoringByUuidDto, IOutputFindTutoringByUuidDto>
{
  constructor(
    @inject(ITutoringRepositoryToken)
    private tutoringRepository: ITutoringRepository
  ) {}

  async exec(props: IInputFindTutoringByUuidDto): Promise<IOutputFindTutoringByUuidDto> {
    const tutoring = await this.tutoringRepository.findByUuid(props)

    return tutoring
  }
}
