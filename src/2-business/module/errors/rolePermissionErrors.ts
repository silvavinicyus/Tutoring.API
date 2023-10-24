import { IError } from '@shared/IError'

export class RolePermissionErrors extends IError {
  static createManyError(): IError {
    return new RolePermissionErrors({
      statusCode: 400,
      body: {
        code: 'RPE-401',
        message: 'There was a error while creating these role permissions data',
        shortMessage: 'createManyError',
      },
    })
  }

  static deleteManyError(): IError {
    return new RolePermissionErrors({
      statusCode: 500,
      body: {
        code: 'RPE-402',
        message: 'There was a error while removing these role permissions data',
        shortMessage: 'deleteManyError',
      },
    })
  }
}
