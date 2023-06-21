import { IError } from '@shared/IError'

export class UserErrors extends IError {
  static creationError(): IError {
    return new UserErrors({
      statusCode: 500,
      body: {
        code: 'TE-101',
        message: 'There was a error while creating this user.',
        shortMessage: 'transactionCreationFailed',
      },
    })
  }
}
