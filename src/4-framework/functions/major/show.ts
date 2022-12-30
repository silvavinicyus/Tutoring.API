import '@framework/ioc/inversify.config'
import { ShowMajorOperator } from '@controller/operations/major/showMajor'
import { InputShowMajor } from '@controller/serializers/major/showMajor'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const showMajor = async (event: IHandlerInput): Promise<IHandlerResult> => {
  try {
    const { major_uuid } = event.pathParameters

    const input = new InputShowMajor({ uuid: major_uuid })

    const operator = container.get(ShowMajorOperator)
    const majorResult = await operator.run(input)

    if (majorResult.isLeft()) {
      throw majorResult.value
    }

    return httpResponse('ok', majorResult.value)
  } catch (err) {
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }
    const logger = new LoggerService()
    logger.error(err)
    return httpResponse(
      'internalError',
      'Internal server error while retrieving major data'
    )
  }
}
export const handler = middyfy(showMajor)
