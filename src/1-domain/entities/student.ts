import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { right, Right } from '@shared/either'

export interface IStudentEntity extends ITimestamps {
  id: number
  uuid: string
  name: string
  email: string
  registration_number: string
  cpf?: string
  imgUrl?: string
  course_id?: number
  period?: number
  records_url?: string
  device_token: string
}

export type IInputStundentEntity = Omit<
  IStudentEntity,
  'id' | 'uuid' | 'created_at' | 'updated_at'
>

export class StudentEntity extends AbstractEntity<IStudentEntity> {
  static create(
    props: Partial<IStudentEntity>,
    currentDate: Date
  ): Right<void, StudentEntity> {
    const studentEntity = new StudentEntity({
      id: undefined,
      uuid: undefined,
      created_at: currentDate,
      updated_at: currentDate,
      ...props,
    } as IStudentEntity)

    return right(studentEntity)
  }

  static update(
    props: Partial<IStudentEntity>,
    currentDate: Date
  ): Right<void, StudentEntity> {
    const studentEntity = new StudentEntity({
      ...props,
      updated_at: currentDate,
    } as IStudentEntity)

    return right(studentEntity)
  }
}
