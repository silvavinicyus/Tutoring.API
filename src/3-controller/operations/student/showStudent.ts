import { IOutputFindStudentByUuidDto } from '@business/dto/student/findStudentByUuidDto'
import { FindStudentByUuidUseCase } from '@business/useCases/student/findStudentByUuid'
import { InputShowStudent } from '@controller/serializers/student/showStudent'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class ShowStudentOperator extends AbstractOperator<
  InputShowStudent,
  IOutputFindStudentByUuidDto
> {
  constructor(
    @inject(FindStudentByUuidUseCase)
    private findStudent: FindStudentByUuidUseCase
  ) {
    super()
  }

  async run(input: InputShowStudent): Promise<IOutputFindStudentByUuidDto> {
    this.exec(input)

    const student = await this.findStudent.exec({ uuid: input.uuid })

    if (student.isLeft()) {
      return left(student.value)
    }

    return student
  }
}
