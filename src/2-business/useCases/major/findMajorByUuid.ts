import {
  IInputFindMajorByUuidDto,
  IOutputFindMajorByUuidDto,
} from '@business/dto/major/findMajorByUuidDto'
import {
  IMajorRepository,
  IMajorRepositoryToken,
} from '@business/repositories/major/iMajorRepository'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class FindMajorByUuidUseCase
  implements
    IAbstractUseCase<IInputFindMajorByUuidDto, IOutputFindMajorByUuidDto>
{
  constructor(
    @inject(IMajorRepositoryToken)
    private majorRepository: IMajorRepository
  ) {}

  async exec(
    props: IInputFindMajorByUuidDto
  ): Promise<IOutputFindMajorByUuidDto> {
    const majorResult = await this.majorRepository.findByUuid({
      uuid: props.uuid,
    })

    return majorResult
  }
}
