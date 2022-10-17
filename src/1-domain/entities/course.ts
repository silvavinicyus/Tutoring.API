import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { right, Right } from '@shared/either'

export interface ICourseEntity extends ITimestamps {
  id: number
  uuid: string
  name: string
  period: number
  major_id: number
}

export type IInputCourseEntity = Pick<
  ICourseEntity,
  'name' | 'period' | 'major_id'
>

export class CourseEntity extends AbstractEntity<ICourseEntity> {
  static create(
    props: IInputCourseEntity,
    currentDate: Date
  ): Right<void, CourseEntity> {
    const courseEntity = new CourseEntity({
      id: undefined,
      uuid: undefined,
      created_at: currentDate,
      updated_at: currentDate,
      ...props,
    })
    return right(courseEntity)
  }

  static update(
    props: Partial<ICourseEntity>,
    currentDate: Date
  ): Right<void, CourseEntity> {
    const courseEntity = new CourseEntity({
      ...props,
      updated_at: currentDate,
    } as ICourseEntity)
    return right(courseEntity)
  }
}
