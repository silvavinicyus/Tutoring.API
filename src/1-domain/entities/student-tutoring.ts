import { AbstractEntity } from '@domain/abstractEntity'
import { right, Right } from '@shared/either'

export enum IStatusStudentTutoring {
  APPROVED = 'aprovado',
  DISAPPROVED = 'reprovado',
  ANALISYS = 'analise',
}

export interface IStudentTutoringEntity {
  id: number
  uuid: string
  student_id: number
  tutoring_id: number
  status: IStatusStudentTutoring
  created_at: Date
}

export type IInputStudentTutoringEntity = Omit<
  IStudentTutoringEntity,
  'id' | 'uuid' | 'created_at'
>

export class StudentTutoringEntity extends AbstractEntity<IStudentTutoringEntity> {
  static create(
    props: IInputStudentTutoringEntity,
    currentDate: Date
  ): Right<void, StudentTutoringEntity> {
    const studentCourseEntity = new StudentTutoringEntity({
      id: undefined,
      uuid: undefined,
      created_at: currentDate,
      ...props,
    })

    return right(studentCourseEntity)
  }
}
