import { IError } from '@shared/IError'

export class TutoringErrors extends IError {
  static creationError(): IError {
    return new TutoringErrors({
      statusCode: 500,
      body: {
        code: 'TT-101',
        message: 'Error on Tutoring`s creation',
        shortMessage: 'TutoringCreationFailed',
      },
    })
  }

  static loadFailed(): IError {
    return new TutoringErrors({
      statusCode: 500,
      body: {
        code: 'TT-301',
        message: 'It wasn`t possible to load',
        shortMessage: 'TutoringLoadFailed',
      },
    })
  }
}
