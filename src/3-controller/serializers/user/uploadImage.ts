import { IsNotEmpty, IsObject } from 'class-validator'
import { IFile } from '@business/services/s3Storage/iS3Storage'
import { IError } from '@shared/IError'
import { Either } from '@shared/either'
import { AbstractSerializer } from '../abstractSerializer'

export type IInputUploadImageProps = {
  file: IFile
}

export type IOutputUploadImageDto = Either<IError, void>

export class InputUploadImage extends AbstractSerializer<IInputUploadImageProps> {
  @IsObject()
  @IsNotEmpty()
  file: IFile
}
