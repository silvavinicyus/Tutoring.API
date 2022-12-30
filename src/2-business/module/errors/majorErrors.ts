import { IError } from '@shared/IError'

export class MajorErrors extends IError {
  static creationError(): IError {
    return new MajorErrors({
      statusCode: 500,
      body: {
        code: 'MJ-101',
        message: 'Error on Major`s creation',
        shortMessage: 'MajorCreationFailed',
      },
    })
  }

  static loadFailed(): IError {
    return new MajorErrors({
      statusCode: 500,
      body: {
        code: 'MJ-301',
        message: 'It wasn`t possible to load',
        shortMessage: 'MajorLoadFailed',
      },
    })
  }
}
