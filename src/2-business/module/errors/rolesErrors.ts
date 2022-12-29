import { IError } from '@shared/IError'

export class RolesErrors extends IError {
  static notAllowed(): IError {
    return new RolesErrors({
      statusCode: 401,
      body: {
        code: 'RE-401',
        message: 'Your role doesn`t have access to this functionality',
        shortMessage: 'roleNotAllowed',
      },
    })
  }

  static creationError(): IError {
    return new RolesErrors({
      statusCode: 500,
      body: {
        code: 'RE-101',
        message: 'Error on Role`s creation',
        shortMessage: 'RoleCreationFailed',
      },
    })
  }
}
