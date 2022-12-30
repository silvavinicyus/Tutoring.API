import { IOutputCreateCourseDto } from '@business/dto/course/createCourseDto'
import { IAuthorizer } from '@business/dto/role/authorize'
import { CreateCourseUseCase } from '@business/useCases/course/createCourse'
import { FindMajorByUuidUseCase } from '@business/useCases/major/findMajorByUuid'
import { VerifyProfileUseCase } from '@business/useCases/role/verifyProfile'
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
    private createCourse: CreateCourseUseCase,
    @inject(VerifyProfileUseCase)
    private verifyProfile: VerifyProfileUseCase,
    @inject(FindMajorByUuidUseCase)
    private findMajor: FindMajorByUuidUseCase
  ) {
    super()
  }

  async run(
    input: InputCreateCourse,
    authorizer: IAuthorizer
  ): Promise<IOutputCreateCourseDto> {
    const authUserResult = await this.verifyProfile.exec({
      user: authorizer,
      roles: [],
    })

    if (authUserResult.isLeft()) {
      return left(authUserResult.value)
    }
    this.exec(input)

    const transaction = await this.createTransaction.exec()
    if (transaction.isLeft()) {
      return left(transaction.value)
    }

    const major = await this.findMajor.exec({ uuid: input.major_uuid })
    if (major.isLeft()) {
      await transaction.value.rollback()
      return left(major.value)
    }

    const courseResult = await this.createCourse.exec(
      {
        ...input,
        major_id: major.value.id,
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
