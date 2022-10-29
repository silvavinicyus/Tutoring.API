import '@framework/ioc/inversify.config'
import { IInputCreateStudentDto } from '@business/dto/student/createStudentDto'
import { CreateStudentOperator } from '@controller/operations/student/createStudent'
import { InputCreateStudent } from '@controller/serializers/student/createStudent'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const createStudent = async (event: IHandlerInput): Promise<IHandlerResult> => {
  try {
    const requestInput = event.only<IInputCreateStudentDto>([
      'name',
      'cpf',
      'device_token',
      'email',
      'major_id',
      'period',
      'records_url',
      'registration_number',
    ])

    const input = new InputCreateStudent(requestInput)
    const operator = container.get(CreateStudentOperator)
    const studentResult = await operator.run(input)
    if (studentResult.isLeft()) {
      throw studentResult.value
    }

    return httpResponse('created', studentResult.value)
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

export const handler = middyfy(createStudent)
