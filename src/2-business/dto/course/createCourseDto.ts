import { ICourseEntity, IInputCourseEntity } from '@domain/entities/course'
import { Either } from '@shared/either'
import { IError } from '@shared/IError'

export type IInputCreateCourseDto = IInputCourseEntity

export type IOutputCreateCourseDto = Either<IError, ICourseEntity>
