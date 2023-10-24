import { IAuthorizerInformation } from '@business/dto/role/authorize'
import { CreateFileUseCase } from '@business/useCases/file/createFile'
import { DeleteFileUseCase } from '@business/useCases/file/deleteFile'
import { FindByFileUseCase } from '@business/useCases/file/findByFile'
import { DeletePrivateFileUseCase } from '@business/useCases/storage/deletePrivateFile'
import { SavePrivateFileUseCase } from '@business/useCases/storage/savePrivateFile'
import { CreateTransactionUseCase } from '@business/useCases/transaction/CreateTransactionUseCase'
import { FindByUserUseCase } from '@business/useCases/user/findByUser'
import { UpdateUserUseCase } from '@business/useCases/user/updateUser'
import {
  IOutputUploadImageDto,
  InputUploadImage,
} from '@controller/serializers/user/uploadImage'
import { left, right } from '@shared/either'
import { inject, injectable } from 'inversify'
import { AbstractOperator } from '../abstractOperator'

@injectable()
export class UploadUserImageOperator extends AbstractOperator<
  InputUploadImage,
  IOutputUploadImageDto
> {
  constructor(
    @inject(UpdateUserUseCase)
    private updateUser: UpdateUserUseCase,
    @inject(FindByUserUseCase)
    private findUserBy: FindByUserUseCase,
    @inject(SavePrivateFileUseCase)
    private savePrivateFile: SavePrivateFileUseCase,
    @inject(DeletePrivateFileUseCase)
    private deletePrivateFile: DeletePrivateFileUseCase,
    @inject(FindByFileUseCase)
    private findByFile: FindByFileUseCase,
    @inject(CreateFileUseCase)
    private createFile: CreateFileUseCase,
    @inject(DeleteFileUseCase)
    private deleteFile: DeleteFileUseCase,
    @inject(CreateTransactionUseCase)
    private createTransaction: CreateTransactionUseCase
  ) {
    super()
  }

  async run(
    input: InputUploadImage,
    authorizer: IAuthorizerInformation
  ): Promise<IOutputUploadImageDto> {
    this.exec(input)

    const user = await this.findUserBy.exec({
      where: [
        {
          column: 'id',
          value: authorizer.user_real_id,
        },
      ],
    })

    if (user.isLeft()) {
      return left(user.value)
    }

    const transaction = await this.createTransaction.exec()

    if (transaction.isLeft()) {
      return left(transaction.value)
    }

    const key = `${input.file.filename}-${new Date().getTime()}`.trim()

    const imageUpload = await this.savePrivateFile.exec({
      file: input.file,
      key,
    })

    if (imageUpload.isLeft()) {
      await transaction.value.rollback()
      return left(imageUpload.value)
    }

    const imageFile = await this.createFile.exec(
      {
        key,
        name: input.file.filename,
        type: 'image',
      },
      transaction.value.trx
    )

    if (imageFile.isLeft()) {
      await transaction.value.rollback()
      return left(imageFile.value)
    }

    const userResult = await this.updateUser.exec(
      {
        image_id: imageFile.value.id,
      },
      {
        column: 'id',
        value: authorizer.user_real_id,
      },
      transaction.value.trx
    )

    if (userResult.isLeft()) {
      await transaction.value.rollback()
      return left(userResult.value)
    }

    if (user.value.image_id) {
      const image = await this.findByFile.exec({
        where: [
          {
            column: 'id',
            value: user.value.image_id,
          },
        ],
      })

      if (image.isLeft()) {
        await transaction.value.rollback()
        return left(image.value)
      }

      const deleteImage = await this.deleteFile.exec(
        {
          id: user.value.image_id,
        },
        transaction.value.trx
      )

      if (deleteImage.isLeft()) {
        await transaction.value.rollback()
        return left(deleteImage.value)
      }

      const s3Delete = await this.deletePrivateFile.exec({
        key: image.value.key,
      })

      if (s3Delete.isLeft()) {
        await transaction.value.rollback()
        return left(s3Delete.value)
      }
    }

    await transaction.value.commit()
    return right(void 0)
  }
}
