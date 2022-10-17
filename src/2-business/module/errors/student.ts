import { IError } from '@shared/IError'

export class StudentErrors extends IError {
  static creationError(): IError {
    return new StudentErrors({
      statusCode: 500,
      body: {
        code: 'ST-101',
        message: 'Error on Student`s creation',
        shortMessage: 'StudentCreationFailed',
      },
    })
  }

  static updateError(): IError {
    return new StudentErrors({
      statusCode: 500,
      body: {
        code: 'ST-201',
        message: 'Error on Student`s update',
        shortMessage: 'StudentUpdateFailed',
      },
    })
  }

  static notFound(): IError {
    return new StudentErrors({
      statusCode: 404,
      body: {
        code: 'ST-302',
        message: 'Student not found',
        shortMessage: 'StudentNotFound',
      },
    })
  }

  static databaseConn(): IError {
    return new StudentErrors({
      statusCode: 500,
      body: {
        code: 'ST-501',
        message: 'An internal error in connection with Student database',
        shortMessage: 'DatabaseConnectionFailed',
      },
    })
  }

  static loadFailed(): IError {
    return new StudentErrors({
      statusCode: 500,
      body: {
        code: 'ST-301',
        message: 'It wasn`t possible to load',
        shortMessage: 'StudentsLoadFailed',
      },
    })
  }

  static deleteFailed(): IError {
    return new StudentErrors({
      statusCode: 500,
      body: {
        code: 'ST-303',
        message: 'It wasn`t possible to delete',
        shortMessage: 'StudentsDeleteFailed',
      },
    })
  }
}
