import '@framework/ioc/inversify.config'
import { IInputCreateCourseDto } from '@business/dto/course/createCourseDto'
import { CreateCourseOperator } from '@controller/operations/course/createCourse'
import { InputCreateCourse } from '@controller/serializers/course/createCourse'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const createCourse = async (event: IHandlerInput): Promise<IHandlerResult> => {
  try {
    const { major_uuid } = event.pathParameters
    const requestInput = event.only<IInputCreateCourseDto>(['name', 'period'])

    const input = new InputCreateCourse({ ...requestInput, major_uuid })
    const operator = container.get(CreateCourseOperator)
    const courseResult = await operator.run(
      input,
      event.requestContext.authorizer
    )
    if (courseResult.isLeft()) {
      throw courseResult.value
    }

    return httpResponse('created', courseResult.value)
  } catch (err) {
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }
    const logger = new LoggerService()
    logger.error(err)
    return httpResponse(
      'internalError',
      'Internal server error in course creation'
    )
  }
}

export const handler = middyfy(createCourse)
