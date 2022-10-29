import { ShowStudentOperator } from '@controller/operations/student/showStudent'
import { InputShowStudent } from '@controller/serializers/student/showStudent'
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
    const { student_uuid } = event.pathParameters

    const input = new InputShowStudent({ uuid: student_uuid })

    const operator = container.get(ShowStudentOperator)
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
