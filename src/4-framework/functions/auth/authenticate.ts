import '@framework/ioc/inversify.config'
import { AuthenticateOperator } from '@controller/operations/auth/authenticate'
import {
  IInputAuthenticateOperator,
  InputAuthenticate,
} from '@controller/serializers/auth/authenticate'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const authenticate = async (event: IHandlerInput): Promise<IHandlerResult> => {
  try {
    const requestInput = event.only<IInputAuthenticateOperator>([
      'email',
      'password',
    ])

    const input = new InputAuthenticate(requestInput)
    const operator = container.get(AuthenticateOperator)
    const userResult = await operator.run(input)
    if (userResult.isLeft()) {
      throw userResult.value
    }

    return httpResponse('ok', userResult.value)
  } catch (err) {
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }
    const logger = new LoggerService()
    logger.error(err)
    return httpResponse(
      'internalError',
      'Internal server error while doing the authentication'
    )
  }
}
export const handler = middyfy(authenticate)
