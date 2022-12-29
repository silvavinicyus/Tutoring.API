import { IOutputGetAllStudents } from '@business/dto/student/getAllStudentsDto'
import { GetAllStudentsUseCase } from '@business/useCases/student/getAllStudents'
import { InputGetAllStudents } from '@controller/serializers/student/getAllStudents'
import { left } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class GetAllStudentsOperator extends AbstractOperator<
  InputGetAllStudents,
  IOutputGetAllStudents
> {
  constructor(
    @inject(GetAllStudentsUseCase)
    private getAllStudents: GetAllStudentsUseCase
  ) {
    super()
  }

  async run(input: InputGetAllStudents): Promise<IOutputGetAllStudents> {
    this.exec(input)

    const students = await this.getAllStudents.exec({
      limit: input.limit,
      page: input.page,
    })

    if (students.isLeft()) {
      return left(students.value)
    }

    return students
  }
}
