import { StudentTutoringErrors } from '@business/module/errors/studentTutoringErrors'
import { IStudentTutoringRepository } from '@business/repositories/studentTutoring/iStudentTutoringRepository'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { IStudentTutoringEntity } from '@domain/entities/student-tutoring'
import { StudentTutoringModel } from '@framework/models/student-tutoring'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { inject, injectable } from 'inversify'
import { ITransaction } from './transaction'

@injectable()
export class StudentTutoringRepositorySequelize
  implements IStudentTutoringRepository
{
  constructor(
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async subscribe(
    props: IStudentTutoringEntity,
    trx?: ITransaction
  ): Promise<Either<IError, IStudentTutoringEntity>> {
    try {
      const studentTutoring = await StudentTutoringModel.create(props, {
        transaction: trx,
      })

      return right(studentTutoring.get({ plain: true }))
    } catch (err) {
      this.loggerService.error(`ERROR: ${err}`)
      return left(StudentTutoringErrors.subscriptionError())
    }
  }
}
