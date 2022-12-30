import '@framework/ioc/inversify.config'
import { CreateTutoringOperator } from '@controller/operations/tutoring/createTutoring'
import {
  IInputCreateTutoringDtoOperator,
  InputCreateTutoring,
} from '@controller/serializers/tutoring/createTutoring'
import { IStatusTutoring } from '@domain/entities/tutoring'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const createTutoring = async (
  event: IHandlerInput
): Promise<IHandlerResult> => {
  try {
    const requestInput = event.only<IInputCreateTutoringDtoOperator>([
      'course_uuid',
      'major_uuid',
      'description',
      'payment_value',
      'status',
      'vacancy_number',
      'with_payment',
    ])

    const input = new InputCreateTutoring({
      ...requestInput,
      status: IStatusTutoring[requestInput.status],
    })
    const operator = container.get(CreateTutoringOperator)
    const tutoringResult = await operator.run(
      input,
      event.requestContext.authorizer
    )
    if (tutoringResult.isLeft()) {
      throw tutoringResult.value
    }

    return httpResponse('created', tutoringResult.value)
  } catch (err) {
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }
    const logger = new LoggerService()
    logger.error(err)
    return httpResponse(
      'internalError',
      'Internal server error in tutoring creation'
    )
  }
}

export const handler = middyfy(createTutoring)
