import { IOutputFindTutoringByUuidDto } from '@business/dto/tutoring/findTutoringByUuidDto'
import { FindTutoringByUuidUseCase } from '@business/useCases/tutoring/showTutoring'
import { InputShowTutoring } from '@controller/serializers/tutoring/showTutoring'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class ShowTutoringOperator extends AbstractOperator<
  InputShowTutoring,
  IOutputFindTutoringByUuidDto
> {

  constructor(
    @inject(FindTutoringByUuidUseCase)
    private findTutoring: FindTutoringByUuidUseCase
  ){
    super()
  }

  async run(input: InputShowTutoring): Promise<IOutputFindTutoringByUuidDto> {
    this.exec(input)

    const tutoring = await this.findTutoring.exec({uuid: input.uuid})

    if(tutoring.isLeft()) {
      return left(tutoring.value)
    }

    return tutoring
  }
}
