import { AbstractEntity } from '@domain/abstractEntity'
import { right, Right } from '@shared/either'

export interface IStudentCourseEntity {
  id: number
  uuid: string
  student_id: number
  course_id: number
  created_at: Date
}

export type IInputStudentCourseEntity = Omit<
  IStudentCourseEntity,
  'id' | 'uuid' | 'created_at'
>

export class StudentCourseEntity extends AbstractEntity<IStudentCourseEntity> {
  static create(
    props: IInputStudentCourseEntity,
    currentDate: Date
  ): Right<void, StudentCourseEntity> {
    const studentCourseEntity = new StudentCourseEntity({
      id: undefined,
      uuid: undefined,
      created_at: currentDate,
      ...props,
    })

    return right(studentCourseEntity)
  }
}
