import { IError } from '@shared/IError'

export class StudentTutoringErrors extends IError {
  static subscriptionError(): IError {
    return new StudentTutoringErrors({
      statusCode: 500,
      body: {
        code: 'STE-501',
        message: 'Error while subscribing to the tutoring',
        shortMessage: 'StudentTutoringSubscriptionFailed',
      },
    })
  }
}
