import { IOutputCreateStudentDto } from '@business/dto/student/createStudentDto'
import { CreateStudentUseCase } from '@business/useCases/student/createStudent'
import { InputCreateStudent } from '@controller/serializers/student/createStudent'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class CreateStudentOperator extends AbstractOperator<
  InputCreateStudent,
  IOutputCreateStudentDto
> {
  constructor(
    @inject(CreateStudentUseCase)
    private createStudent: CreateStudentUseCase
  ) {
    super()
  }

  async run(input: InputCreateStudent): Promise<IOutputCreateStudentDto> {
    this.exec(input)

    const studentResult = await this.createStudent.exec(input)

    if (studentResult.isLeft()) {
      return left(studentResult.value)
    }

    return studentResult
  }
}
