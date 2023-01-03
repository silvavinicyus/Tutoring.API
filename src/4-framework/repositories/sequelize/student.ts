import { IInputDeleteStudentDto } from '@business/dto/student/deleteStudentDto'
import { IInputFindStudentByEmailDto } from '@business/dto/student/findStudentByEmailDto'
import { IInputFindStudentByUuidDto } from '@business/dto/student/findStudentByUuidDto'
import { IPaginatedResponse } from '@business/dto/useCaseOptions'
import { StudentErrors } from '@business/module/errors/student'
import { IStudentRepository } from '@business/repositories/student/iStudentRepository'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { IStudentEntity } from '@domain/entities/student'
import { StudentModel } from '@framework/models/student'
import { Either, left, right } from '@shared/either'
import { IError } from '@shared/IError'
import { inject, injectable } from 'inversify'
import { ITransaction } from './transaction'

@injectable()
export class StudentRepositorySequelize implements IStudentRepository {
  constructor(
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async findByEmail(
    props: IInputFindStudentByEmailDto
  ): Promise<Either<IError, IStudentEntity>> {
    try {
      const student = await StudentModel.findOne({
        where: {
          email: props.email,
        },
        include: [
          {
            attributes: ['name'],
            association: 'role',
          },
        ],
      })

      if (!student) {
        return left(StudentErrors.notFound())
      }

      return right(student.get({ plain: true }))
    } catch (err) {
      this.loggerService.error(`LOAD ERROR: ${err}`)
      return left(StudentErrors.loadFailed())
    }
  }

  async getAll(
    page: number,
    limit: number
  ): Promise<Either<IError, IPaginatedResponse<IStudentEntity>>> {
    try {
      const studentData = await StudentModel.findAll({
        limit,
        offset: limit * (page - 1),
        order: [['created_at', 'DESC']],
        include: [
          {
            attributes: ['name'],
            association: 'role',
          },
        ],
      })

      const studentItems = studentData.map((item) => item.get({ plain: true }))

      return right({
        page,
        perPage: limit,
        count: studentItems.length,
        items: studentItems,
      })
    } catch (err) {
      this.loggerService.error(`LOAD ERROR: ${err}`)
      return left(StudentErrors.loadFailed())
    }
  }

  async update(
    props: IStudentEntity,
    trx?: ITransaction
  ): Promise<Either<IError, IStudentEntity>> {
    try {
      const student = await StudentModel.findByPk(props.id)

      await student.update(props, { transaction: trx })

      return right(student.get({ plain: true }))
    } catch (err) {
      this.loggerService.error(`UPDATE ERROR: ${err}`)
      return left(StudentErrors.updateError())
    }
  }

  async create(
    props: IStudentEntity,
    trx?: ITransaction
  ): Promise<Either<IError, IStudentEntity>> {
    try {
      const student = await StudentModel.create(props, { transaction: trx })

      return right(student.get({ plain: true }))
    } catch (err) {
      this.loggerService.error(`CREATION ERROR: ${err}`)
      return left(StudentErrors.creationError())
    }
  }

  async findByUuid(
    props: IInputFindStudentByUuidDto
  ): Promise<Either<IError, IStudentEntity>> {
    try {
      const student = await StudentModel.findOne({
        where: {
          uuid: props.uuid,
        },
        include: [
          {
            attributes: ['name'],
            association: 'role',
          },
        ],
      })

      if (!student) {
        return left(StudentErrors.notFound())
      }

      console.log({ role: student.get({ plain: true })['role'] })

      return right(student.get({ plain: true }))
    } catch (err) {
      this.loggerService.error(`LOAD ERROR: ${err}`)
      return left(StudentErrors.loadFailed())
    }
  }

  async delete(
    props: IInputDeleteStudentDto,
    trx?: ITransaction
  ): Promise<Either<IError, void>> {
    try {
      await StudentModel.destroy({
        where: {
          id: props.id,
        },
        transaction: trx,
      })

      return right(void 0)
    } catch (err) {
      this.loggerService.error(`DELETE ERROR: ${err}`)
      return left(StudentErrors.deleteFailed())
    }
  }
}
