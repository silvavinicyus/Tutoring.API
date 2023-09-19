import '@framework/ioc/inversify.config'
import { IInputCreateUserDto } from '@business/dto/user/create'
import { CreateUserOperator } from '@controller/operations/user/create'
import { InputCreateUser } from '@controller/serializers/user/createUser'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const createUser = async (event: IHandlerInput): Promise<IHandlerResult> => {
  try {
    const requestInput = event.only<IInputCreateUserDto>([
      'name',
      'email',
      'password',
      'birthdate',
      'phone',
    ])

    console.log(event.requestContext.authorizer)

    const input = new InputCreateUser(requestInput)
    const operator = container.get(CreateUserOperator)
    const userResult = await operator.run(
      input,
      event.requestContext.authorizer
    )
    if (userResult.isLeft()) {
      throw userResult.value
    }

    return httpResponse('created', userResult.value)
  } catch (err) {
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }
    const logger = new LoggerService()
    logger.error(err)
    return httpResponse(
      'internalError',
      'Internal server error in user creation'
    )
  }
}

export const handler = middyfy(createUser)
