import { IInputFindTutoringByUuidDto } from '@business/dto/tutoring/findTutoringByUuidDto'
import { TutoringErrors } from '@business/module/errors/tutoringErrors'
import { ITutoringRepository } from '@business/repositories/tutoring/iTutoringRepository'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { ITutoringEntity } from '@domain/entities/tutoring'
import { TutoringModel } from '@framework/models/tutoring'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { inject, injectable } from 'inversify'
import { ITransaction } from './transaction'

@injectable()
export class TutoringRepositorySequelize implements ITutoringRepository {
  constructor(
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async create(
    props: ITutoringEntity,
    trx?: ITransaction
  ): Promise<Either<IError, ITutoringEntity>> {
    try {
      const tutoring = await TutoringModel.create(props, { transaction: trx })

      return right(tutoring.get({ plain: true }))
    } catch (err) {
      this.loggerService.error(`ERROR: ${err}`)
      return left(TutoringErrors.creationError())
    }
  }

  async findByUuid(
    props: IInputFindTutoringByUuidDto
  ): Promise<Either<IError, ITutoringEntity>> {
    try {
      const tutoring = await TutoringModel.findOne({
        where: {
          uuid: props.uuid,
        },
      })

      return right(tutoring.get({ plain: true }))
    } catch (err) {
      this.loggerService.error(`ERROR: ${err}`)
      return left(TutoringErrors.loadFailed())
    }
  }
}
