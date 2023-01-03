import { UnsubscribeToTutoringOperator } from '@controller/operations/studentTutoring/unsubscribeToTutoring'
import { InputUnsubscribeToTutoring } from '@controller/serializers/tutoringStudent/unsubscribeToTutoring'
import '@framework/ioc/inversify.config'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const unsubscribeToTutoring = async (
  event: IHandlerInput
): Promise<IHandlerResult> => {
  try {
    const { tutoring_uuid } = event.pathParameters

    const input = new InputUnsubscribeToTutoring({
      tutoring_uuid,
    })

    const operator = container.get(UnsubscribeToTutoringOperator)

    const unsubscriptionResult = await operator.run(
      input,
      event.requestContext.authorizer
    )
    if (unsubscriptionResult.isLeft()) {
      throw unsubscriptionResult.value
    }

    return httpResponse('noContent', {})
  } catch (err) {
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }
    const logger = new LoggerService()
    logger.error(err)
    return httpResponse(
      'internalError',
      'Internal server error while unsubscribing'
    )
  }
}

export const handler = middyfy(unsubscribeToTutoring)
