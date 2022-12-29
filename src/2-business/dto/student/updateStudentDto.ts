import { IStudentEntity } from '@domain/entities/student'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputUpdateStudentDto = Pick<
  IStudentEntity,
  'device_token' | 'name' | 'period' | 'records_url' | 'img_url' | 'uuid'
>

export type IOutputUpdateStudentDto = Either<IError, IStudentEntity>
