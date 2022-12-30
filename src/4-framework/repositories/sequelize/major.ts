import { IInputFindMajorByUuidDto } from '@business/dto/major/findMajorByUuidDto'
import { MajorErrors } from '@business/module/errors/majorErrors'
import { IMajorRepository } from '@business/repositories/major/iMajorRepository'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { IMajorEntity } from '@domain/entities/major'
import { MajorModel } from '@framework/models/major'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { inject, injectable } from 'inversify'
import { ITransaction } from './transaction'

@injectable()
export class MajorREpositorySequelize implements IMajorRepository {
  constructor(
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async create(
    props: IMajorEntity,
    trx?: ITransaction
  ): Promise<Either<IError, IMajorEntity>> {
    try {
      const major = await MajorModel.create(props, { transaction: trx })

      return right(major.get({ plain: true }))
    } catch (err) {
      this.loggerService.error(`ERROR: ${err}`)
      return left(MajorErrors.creationError())
    }
  }

  async findByUuid(
    props: IInputFindMajorByUuidDto
  ): Promise<Either<IError, IMajorEntity>> {
    try {
      const major = await MajorModel.findOne({
        where: {
          uuid: props.uuid,
        },
      })

      return right(major.get({ plain: true }))
    } catch (err) {
      this.loggerService.error(`error: ${err}`)
      return left(MajorErrors.loadFailed())
    }
  }
}
