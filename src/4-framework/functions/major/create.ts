import '@framework/ioc/inversify.config'
import { IInputCreateMajorDto } from '@business/dto/major/createMajorDto'
import { CreateMajorOperator } from '@controller/operations/major/createMajor'
import { InputCreateMajor } from '@controller/serializers/major/createMajor'
import { IShift } from '@domain/entities/major'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const createMajor = async (event: IHandlerInput): Promise<IHandlerResult> => {
  try {
    const requestInput = event.only<IInputCreateMajorDto>(['name', 'shift'])

    const input = new InputCreateMajor({
      ...requestInput,
      shift: IShift[requestInput.shift.toUpperCase()],
    })
    const operator = container.get(CreateMajorOperator)
    const majorResult = await operator.run(
      input,
      event.requestContext.authorizer
    )
    if (majorResult.isLeft()) {
      throw majorResult.value
    }

    return httpResponse('created', majorResult.value)
  } catch (err) {
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }
    const logger = new LoggerService()
    logger.error(err)
    return httpResponse(
      'internalError',
      'Internal server error in major creation'
    )
  }
}

export const handler = middyfy(createMajor)
