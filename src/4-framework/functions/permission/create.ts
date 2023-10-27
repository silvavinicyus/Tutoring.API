/* eslint-disable @typescript-eslint/no-explicit-any */
import '@framework/ioc/inversify.config'
import { CreateManyPermissionsOperator } from '@controller/operations/permission/createMany'
import {
  InputCreateManyPermissions,
  InputCreatePermission,
} from '@controller/serializers/permission/create'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const createPermission = async (
  event: IHandlerInput
): Promise<IHandlerResult> => {
  try {
    const body = event.body as any

    const input = new InputCreateManyPermissions({
      permissions: body.permissions.map(
        (permission) =>
          new InputCreatePermission({
            name: permission.name,
            description: permission.description,
            permission_group: permission.permission_group,
          })
      ),
    })
    const operator = container.get(CreateManyPermissionsOperator)
    const permissionResult = await operator.run(
      input,
      event.requestContext.authorizer
    )

    if (permissionResult.isLeft()) {
      throw permissionResult.value
    }

    return httpResponse('created', permissionResult.value)
  } catch (err) {
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }
    const logger = new LoggerService()
    logger.error(err)
    return httpResponse(
      'internalError',
      'Internal server error in permission creation'
    )
  }
}

export const handler = middyfy(createPermission)
