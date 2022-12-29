import { IOutputDeleteStudentDto } from '@business/dto/student/deleteStudentDto'
import { DeleteStudentUseCase } from '@business/useCases/student/deleteStudent'
import { FindStudentByUuidUseCase } from '@business/useCases/student/findStudentByUuid'
import { InputDeleteStudent } from '@controller/serializers/student/deleteStudent'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class DeleteStudentOperator extends AbstractOperator<
  InputDeleteStudent,
  IOutputDeleteStudentDto
> {
  constructor(
    @inject(FindStudentByUuidUseCase)
    private findStudent: FindStudentByUuidUseCase,
    @inject(DeleteStudentUseCase)
    private deleteStudent: DeleteStudentUseCase
  ) {
    super()
  }

  async run(input: InputDeleteStudent): Promise<IOutputDeleteStudentDto> {
    this.exec(input)

    const student = await this.findStudent.exec({ uuid: input.uuid })

    if (student.isLeft()) {
      return left(student.value)
    }

    const deleteStudentResult = await this.deleteStudent.exec({
      id: student.value.id,
    })

    if (deleteStudentResult.isLeft()) {
      return left(deleteStudentResult.value)
    }

    return right(void 0)
  }
}
