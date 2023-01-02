import { SubscribeToTutoringOperator } from '@controller/operations/studentTutoring/subscribeToTutoring'
import {
  IInputSubscribeToTutoringOperatorDto,
  InputSubscribeToTutoring,
} from '@controller/serializers/tutoringStudent/subscribeToTutoring'
import '@framework/ioc/inversify.config'
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
    const requestInput = event.only<IInputSubscribeToTutoringOperatorDto>([
      'status',
    ])

    const { tutoring_uuid } = event.pathParameters

    const input = new InputSubscribeToTutoring({
      ...requestInput,
      tutoring_uuid,
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
