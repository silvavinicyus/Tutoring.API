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

  static unsubscriptionError(): IError {
    return new StudentTutoringErrors({
      statusCode: 500,
      body: {
        code: 'STE-701',
        message: 'Error while unsubscribing to the tutoring',
        shortMessage: 'StudentTutoringUnsubscriptionFailed',
      },
    })
  }

  static notFound(): IError {
    return new StudentTutoringErrors({
      statusCode: 404,
      body: {
        code: 'STE-404',
        message: 'This user isnt subscribed to this tutoring',
        shortMessage: 'UserNotSubscribed',
      },
    })
  }
}
