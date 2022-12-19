import { ICourseRepository } from '@business/repositories/course/iCourseRepository'
import { ICourseEntity } from '@domain/entities/course'
import { CourseModel } from '@framework/models/course'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { injectable } from 'inversify'
import { ITransaction } from './transaction'

@injectable()
export class CourseRepositorySequelize implements ICourseRepository {
  async create(
    input: ICourseEntity,
    trx?: ITransaction
  ): Promise<Either<IError, ICourseEntity>> {
    try {
      const course = await CourseModel.create(input, { transaction: trx })

      return right(course.get({ plain: true }))
    } catch (err) {
      console.log(err)
      return left(err)
    }
  }
}
