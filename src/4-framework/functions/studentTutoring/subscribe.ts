import '@framework/ioc/inversify.config'
import { SubscribeToTutoringOperator } from '@controller/operations/studentTutoring/subscribeToTutoring'
import {
  IInputSubscribeToTutoringOperatorDto,
  InputSubscribeToTutoring,
} from '@controller/serializers/tutoringStudent/subscribeToTutoring'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const subscribeToTutoring = async (
  event: IHandlerInput
): Promise<IHandlerResult> => {
  try {
    const { tutoring_uuid } = event.pathParameters

    const { records_url } = event.only<IInputSubscribeToTutoringOperatorDto>([
      'records_url',
    ])

    const input = new InputSubscribeToTutoring({
      tutoring_uuid,
      records_url,
    })

    const operator = container.get(SubscribeToTutoringOperator)

    const subscriptionResult = await operator.run(
      input,
      event.requestContext.authorizer
    )
    if (subscriptionResult.isLeft()) {
      throw subscriptionResult.value
    }

    return httpResponse('ok', subscriptionResult.value)
  } catch (err) {
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }
    const logger = new LoggerService()
    logger.error(err)
    return httpResponse(
      'internalError',
      'Internal server error while subscribing'
    )
  }
}

export const handler = middyfy(subscribeToTutoring)
