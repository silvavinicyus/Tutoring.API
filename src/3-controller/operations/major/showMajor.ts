import { IOutputFindMajorByUuidDto } from '@business/dto/major/findMajorByUuidDto'
import { FindMajorByUuidUseCase } from '@business/useCases/major/findMajorByUuid'
import { InputShowMajor } from '@controller/serializers/major/showMajor'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class ShowMajorOperator extends AbstractOperator<
  InputShowMajor,
  IOutputFindMajorByUuidDto
> {
  constructor(
    @inject(FindMajorByUuidUseCase)
    private findMajorByUuid: FindMajorByUuidUseCase
  ) {
    super()
  }

  async run(input: InputShowMajor): Promise<IOutputFindMajorByUuidDto> {
    const majorResult = await this.findMajorByUuid.exec({ uuid: input.uuid })

    if (majorResult.isLeft()) {
      return left(majorResult.value)
    }

    return majorResult
  }
}
