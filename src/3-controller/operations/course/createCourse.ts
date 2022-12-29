import { IOutputCreateCourseDto } from '@business/dto/course/createCourseDto'
import { CreateCourseUseCase } from '@business/useCases/course/createCourse'
import { CreateTransactionUseCase } from '@business/useCases/transaction/CreateTransactionUseCase'
import { InputCreateCourse } from '@controller/serializers/course/createCourse'
import { left } from '@shared/either'
import { inject } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

export class CreateCourseOperator extends AbstractOperator<
  InputCreateCourse,
  IOutputCreateCourseDto
> {
  constructor(
    @inject(CreateTransactionUseCase)
    private createTransaction: CreateTransactionUseCase,
    @inject(CreateCourseUseCase)
    private createCourse: CreateCourseUseCase
  ) {
    super()
  }

  async run(input: InputCreateCourse): Promise<IOutputCreateCourseDto> {
    this.exec(input)
    const transaction = await this.createTransaction.exec()
    if (transaction.isLeft()) {
      return left(transaction.value)
    }
    const courseResult = await this.createCourse.exec(
      {
        ...input,
      },
      transaction.value.trx
    )
    if (courseResult.isLeft()) {
      await transaction.value.rollback()
      return left(courseResult.value)
    }

    await transaction.value.commit()
    return courseResult
  }
}
