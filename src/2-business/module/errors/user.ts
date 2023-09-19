import { IError } from '@shared/IError'

export class UserErrors extends IError {
  static creationError(): IError {
    return new UserErrors({
      statusCode: 500,
      body: {
        code: 'ST-101',
        message: 'Error on USer`s creation',
        shortMessage: 'USerCreationFailed',
      },
    })
  }

  static updateError(): IError {
    return new UserErrors({
      statusCode: 500,
      body: {
        code: 'ST-201',
        message: 'Error on USer`s update',
        shortMessage: 'USerUpdateFailed',
      },
    })
  }

  static notFound(): IError {
    return new UserErrors({
      statusCode: 404,
      body: {
        code: 'ST-302',
        message: 'USer not found',
        shortMessage: 'USerNotFound',
      },
    })
  }

  static databaseConn(): IError {
    return new UserErrors({
      statusCode: 500,
      body: {
        code: 'ST-501',
        message: 'An internal error in connection with USer database',
        shortMessage: 'DatabaseConnectionFailed',
      },
    })
  }

  static loadFailed(): IError {
    return new UserErrors({
      statusCode: 500,
      body: {
        code: 'ST-301',
        message: 'It wasn`t possible to load',
        shortMessage: 'USersLoadFailed',
      },
    })
  }

  static deleteFailed(): IError {
    return new UserErrors({
      statusCode: 500,
      body: {
        code: 'ST-303',
        message: 'It wasn`t possible to delete',
        shortMessage: 'USersDeleteFailed',
      },
    })
  }
}
