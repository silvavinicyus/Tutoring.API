import '@framework/ioc/inversify.config'
import { ShowCourseOperator } from '@controller/operations/course/showCourse'
import { InputShowCourse } from '@controller/serializers/course/showCourse'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const showCourse = async (event: IHandlerInput): Promise<IHandlerResult> => {
  try {
    const { course_uuid } = event.pathParameters

    const input = new InputShowCourse({ uuid: course_uuid })
    const operator = container.get(ShowCourseOperator)
    const courseResult = await operator.run(input)
    if (courseResult.isLeft()) {
      throw courseResult.value
    }

    return httpResponse('ok', courseResult.value)
  } catch (err) {
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }
    const logger = new LoggerService()
    logger.error(err)
    return httpResponse(
      'internalError',
      'Internal server error while retrieving course data'
    )
  }
}

export const handler = middyfy(showCourse)
