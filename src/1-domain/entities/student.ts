import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { right, Right } from '@shared/either'
import { IUserEntity } from './user'

export interface IStudentEntity extends IUserEntity, ITimestamps {
  major_id: number
  period: number
  records_url: string
}

export type IInputStundentEntity = Omit<
  IStudentEntity,
  'id' | 'uuid' | 'created_at' | 'updated_at'
>

export class StudentEntity extends AbstractEntity<IStudentEntity> {
  static create(
    props: IInputStundentEntity,
    currentDate: Date
  ): Right<void, StudentEntity> {
    const studentEntity = new StudentEntity({
      id: undefined,
      uuid: undefined,
      ...props,
      created_at: currentDate,
      updated_at: currentDate,
    })

    return right(studentEntity)
  }

  static update(
    props: Partial<Omit<IStudentEntity, 'password'>>,
    currentDate: Date
  ): Right<void, StudentEntity> {
    const studentEntity = new StudentEntity({
      ...props,
      updated_at: currentDate,
    } as IStudentEntity)

    return right(studentEntity)
  }
}
