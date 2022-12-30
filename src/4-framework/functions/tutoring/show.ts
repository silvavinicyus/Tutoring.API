import '@framework/ioc/inversify.config'
import { ShowTutoringOperator } from '@controller/operations/tutoring/showTutoring'
import { InputShowTutoring } from '@controller/serializers/tutoring/showTutoring'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const showTutoring = async (event: IHandlerInput): Promise<IHandlerResult> => {
  try {
    const { tutoring_uuid } = event.pathParameters

    const input = new InputShowTutoring({ uuid: tutoring_uuid })

    const operator = container.get(ShowTutoringOperator)
    const tutoringResult = await operator.run(input)

    if (tutoringResult.isLeft()) {
      throw tutoringResult.value
    }

    return httpResponse('ok', tutoringResult.value)
  } catch (err) {
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }
    const logger = new LoggerService()
    logger.error(err)
    return httpResponse(
      'internalError',
      'Internal server error while retrieving tutoring data'
    )
  }
}
export const handler = middyfy(showTutoring)
