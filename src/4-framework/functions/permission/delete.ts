import '@framework/ioc/inversify.config'
import { DeleteManyPermissionOperator } from '@controller/operations/permission/deleteMany'
import { InputDeletePermission } from '@controller/serializers/permission/delete'
import { LoggerService } from '@framework/services/logger/loggerService'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const deletePermission = async (
  event: IHandlerInput
): Promise<IHandlerResult> => {
  try {
    const input = new InputDeletePermission({
      ids: event.body.ids as unknown as number[],
    })

    const operator = container.get(DeleteManyPermissionOperator)
    const permissionResult = await operator.run(input)

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
      'Internal server error in permission removal'
    )
  }
}

export const handler = middyfy(deletePermission)
