import { IOutputUpdateStudentDto } from '@business/dto/student/updateStudentDto'
import { FindStudentByUuidUseCase } from '@business/useCases/student/findStudentByUuid'
import { UpdateStudentUseCase } from '@business/useCases/student/updateStudent'
import { InputUpdateStudent } from '@controller/serializers/student/updateStudent'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class UpdateStudentOperator extends AbstractOperator<
  InputUpdateStudent,
  IOutputUpdateStudentDto
> {
  constructor(
    @inject(FindStudentByUuidUseCase)
    private findStudent: FindStudentByUuidUseCase,
    @inject(UpdateStudentUseCase)
    private updateStudent: UpdateStudentUseCase
  ) {
    super()
  }

  async run(input: InputUpdateStudent): Promise<IOutputUpdateStudentDto> {
    this.exec(input)

    const student = await this.findStudent.exec({ uuid: input.uuid })
    if (student.isLeft()) return left(student.value)

    const updateStudentData = { ...student.value, ...input }
    const studentResult = await this.updateStudent.exec(updateStudentData)

    if (studentResult.isLeft()) return left(studentResult.value)

    return studentResult
  }
}
