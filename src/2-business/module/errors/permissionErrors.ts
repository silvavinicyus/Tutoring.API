import { IError } from '@shared/IError'

export class PermissionErrors extends IError {
  static creationFailed(): IError {
    return new PermissionErrors({
      statusCode: 500,
      body: {
        code: 'PE-401',
        message: 'There was a error while creating permission!',
        shortMessage: 'creationFailed',
      },
    })
  }

  static loadFailed(): IError {
    return new PermissionErrors({
      statusCode: 500,
      body: {
        code: 'PE-402',
        message: 'There was a error while loading this permission!',
        shortMessage: 'loadFailed',
      },
    })
  }

  static notFound(): IError {
    return new PermissionErrors({
      statusCode: 404,
      body: {
        code: 'PE-403',
        message: 'Permission not found!',
        shortMessage: 'notFound',
      },
    })
  }

  static internalError(): IError {
    return new PermissionErrors({
      statusCode: 500,
      body: {
        code: 'PE-404',
        message: 'There was a error while executing this action!',
        shortMessage: 'internalError',
      },
    })
  }

  static updateFailed(): IError {
    return new PermissionErrors({
      statusCode: 500,
      body: {
        code: 'PE-405',
        message: 'There was a error while updating this permission!',
        shortMessage: 'updateFailed',
      },
    })
  }

  static deleteFailed(): IError {
    return new PermissionErrors({
      statusCode: 500,
      body: {
        code: 'PE-406',
        message: 'There was a error while removing this permission!',
        shortMessage: 'deleteFailed',
      },
    })
  }

  static conflict(): IError {
    return new PermissionErrors({
      statusCode: 409,
      body: {
        code: 'PE-407',
        message: 'A permission with this name already exists!',
        shortMessage: 'conflict',
      },
    })
  }
}
