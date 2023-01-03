import {
  IInputUnsubscribeToTutoringDto,
  IOutputUnsubscribeToTutoringDto,
} from '@business/dto/studentTutoring/unsubscribeToTutoring'
import {
  IStudentTutoringRepository,
  IStudentTutoringRepositoryToken,
} from '@business/repositories/studentTutoring/iStudentTutoringRepository'
import { inject, injectable } from 'inversify'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class UnsubscribeToTutoringUseCase
  implements
    IAbstractUseCase<
      IInputUnsubscribeToTutoringDto,
      IOutputUnsubscribeToTutoringDto
    >
{
  constructor(
    @inject(IStudentTutoringRepositoryToken)
    private studentTutoringRepository: IStudentTutoringRepository
  ) {}

  async exec(
    props: IInputUnsubscribeToTutoringDto
  ): Promise<IOutputUnsubscribeToTutoringDto> {
    const studentTutoringResult =
      await this.studentTutoringRepository.unsubscribe(props)

    return studentTutoringResult
  }
}
