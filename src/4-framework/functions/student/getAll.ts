import '@framework/ioc/inversify.config'
import { GetAllStudentsOperator } from '@controller/operations/student/getAllStudents'
import { InputGetAllStudents } from '@controller/serializers/student/getAllStudents'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const getAllStudents = async (
  event: IHandlerInput
): Promise<IHandlerResult> => {
  try {
    const requestInput = {
      page: +event.queryStringParameters?.page || 1,
      limit: +event.queryStringParameters?.limit || 10,
    }

    const input = new InputGetAllStudents(requestInput)

    const operator = container.get(GetAllStudentsOperator)
    const studentsResult = await operator.run(input)

    if (studentsResult.isLeft()) {
      throw studentsResult.value
    }

    return httpResponse('ok', studentsResult.value)
  } catch (err) {
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }
    const logger = new LoggerService()
    logger.error(err)
    return httpResponse(
      'internalError',
      'Internal server error in foo creation'
    )
  }
}
export const handler = middyfy(getAllStudents)
