import '@framework/ioc/inversify.config'
import { IInputUpdatePermissionDto } from '@business/dto/permission/update'
import { UpdatePermissionOperator } from '@controller/operations/permission/update'
import { InputUpdatePermission } from '@controller/serializers/permission/update'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const updatePermission = async (
  event: IHandlerInput
): Promise<IHandlerResult> => {
  try {
    const requestInput = event.only<IInputUpdatePermissionDto>([
      'description',
      'name',
      'permission_group',
    ])

    const { uuid } = event.pathParameters

    const input = new InputUpdatePermission({ ...requestInput, uuid })

    const operator = container.get(UpdatePermissionOperator)
    const result = await operator.run(input, event.requestContext.authorizer)

    if (result.isLeft()) {
      throw result.value
    }

    return httpResponse('created', result.value)
  } catch (err) {
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }
    const logger = new LoggerService()
    logger.error(err)
    return httpResponse(
      'internalError',
      'Internal server error in permission update'
    )
  }
}
export const handler = middyfy(updatePermission)
