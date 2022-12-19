import { IInputCreateRoleDto } from '@business/dto/role/createRole'
import { CreateRoleOperator } from '@controller/operations/role/createRole'
import { InputCreateRole } from '@controller/serializers/role/createRole'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const createRole = async (event: IHandlerInput): Promise<IHandlerResult> => {
  try {
    const requestInput = event.only<IInputCreateRoleDto>([
      'name',
      'description',
    ])

    const input = new InputCreateRole(requestInput)
    const operator = container.get(CreateRoleOperator)
    const roleResult = await operator.run(input)
    if (roleResult.isLeft()) {
      throw roleResult.value
    }

    return httpResponse('created', roleResult.value)
  } catch (err) {
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }
    const logger = new LoggerService()
    logger.error(err)
    return httpResponse(
      'internalError',
      'Internal server error in role creation'
    )
  }
}

export const handler = middyfy(createRole)
