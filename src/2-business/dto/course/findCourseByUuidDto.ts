import { ICourseEntity } from '@domain/entities/course'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputFindCourseByUuidDto = {
  uuid: string
}

export type IOutputFindCourseByUuidDto = Either<IError, ICourseEntity>
