import '@framework/ioc/inversify.config'
import { IFile } from '@business/services/s3Storage/iS3Storage'
import { UploadUserImageOperator } from '@controller/operations/user/uploadImage'
import { InputUploadImage } from '@controller/serializers/user/uploadImage'
import { httpResponse } from '@framework/utility/httpResponse'
import { middyfy } from '@framework/utility/lambda'
import { IHandlerInput, IHandlerResult } from '@framework/utility/types'
import { IError } from '@shared/IError'
import { container } from '@shared/ioc/container'

const uploadImage = async (event: IHandlerInput): Promise<IHandlerResult> => {
  try {
    const input = new InputUploadImage({
      file: event.body.file as unknown as IFile,
    })

    const operator = container.get(UploadUserImageOperator)
    const result = await operator.run(input, event.requestContext.authorizer)

    if (result.isLeft()) {
      throw result.value
    }

    return httpResponse('ok', {})
  } catch (err) {
    console.error(err)
    if (err instanceof IError) {
      return httpResponse(err.statusCode, err.body)
    }

    return httpResponse('internalError', 'internal server error in user update')
  }
}

export const handler = middyfy(uploadImage)
