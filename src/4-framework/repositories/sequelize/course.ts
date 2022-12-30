import { IInputFindCourseByUuidDto } from '@business/dto/course/findCourseByUuidDto'
import { ICourseRepository } from '@business/repositories/course/iCourseRepository'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { ICourseEntity } from '@domain/entities/course'
import { CourseModel } from '@framework/models/course'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { inject, injectable } from 'inversify'
import { ITransaction } from './transaction'

@injectable()
export class CourseRepositorySequelize implements ICourseRepository {
  constructor(
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async findByUuid(
    input: IInputFindCourseByUuidDto
  ): Promise<Either<IError, ICourseEntity>> {
    try {
      const course = await CourseModel.findOne({
        where: {
          uuid: input.uuid,
        },
      })

      return right(course.get({ plain: true }))
    } catch (err) {
      this.loggerService.error(`error: ${err}`)
      return left(err)
    }
  }

  async create(
    input: ICourseEntity,
    trx?: ITransaction
  ): Promise<Either<IError, ICourseEntity>> {
    try {
      const course = await CourseModel.create(input, { transaction: trx })

      return right(course.get({ plain: true }))
    } catch (err) {
      this.loggerService.error(`error: ${err}`)
      return left(err)
    }
  }
}
