import { IError } from '@shared/IError'

export class AuthErrors extends IError {
  static notAllowed(): IError {
    return new AuthErrors({
      statusCode: 403,
      body: {
        code: 'AT-401',
        message: 'Email or password incorrect',
        shortMessage: 'EmailPasswordError',
      },
    })
  }
}
