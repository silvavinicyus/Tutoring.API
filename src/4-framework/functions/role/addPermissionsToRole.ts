import '@framework/ioc/inversify.config'
import { IInputCreateManyRolePermissionsDto } from '@business/dto/rolePermission/createMany'
import { AddPermissionsToRoleOperator } from '@controller/operations/role/addPermissionsToRole'
import { InputAddPermissionsToRole } from '@controller/serializers/role/addPermissionsToRole'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const createRolePermission = async (
  event: IHandlerInput
): Promise<IHandlerResult> => {
  try {
    const requestInput = event.only<IInputCreateManyRolePermissionsDto>([
      'permissions',
      'role_id',
    ])

    const input = new InputAddPermissionsToRole(requestInput)
    const operator = container.get(AddPermissionsToRoleOperator)
    const rolePermissionResult = await operator.run(
      input,
      event.requestContext.authorizer
    )

    if (rolePermissionResult.isLeft()) {
      throw rolePermissionResult.value
    }

    return httpResponse('created', rolePermissionResult.value)
  } catch (err) {
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }
    const logger = new LoggerService()
    logger.error(err)
    return httpResponse(
      'internalError',
      'Internal server error in role permission creation'
    )
  }
}
export const handler = middyfy(createRolePermission)
