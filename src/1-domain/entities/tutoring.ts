import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { right, Right } from '@shared/either'

export enum IStatusTutoring {
  OPEN = 'aberta',
  CLOSED = 'fechada',
}

export interface ITutoringEntity extends ITimestamps {
  id: number
  uuid: string
  course_id: number
  major_id: number
  description: string
  vacancy_number: number
  with_payment: boolean
  payment_value?: number
  status: IStatusTutoring
}

export type IInputTutoringEntity = Omit<
  ITutoringEntity,
  'id' | 'uuid' | 'created_at' | 'updated_at'
>

export class TutoringEntity extends AbstractEntity<ITutoringEntity> {
  static create(
    props: IInputTutoringEntity,
    currentDate: Date
  ): Right<void, TutoringEntity> {
    const tutoringEntity = new TutoringEntity({
      id: undefined,
      uuid: undefined,
      created_at: currentDate,
      updated_at: currentDate,
      ...props,
    })

    return right(tutoringEntity)
  }

  static update(
    props: Partial<ITutoringEntity>,
    currentDate: Date
  ): Right<void, TutoringEntity> {
    const tutoringEntity = new TutoringEntity({
      ...props,
      updated_at: currentDate,
    } as ITutoringEntity)
    return right(tutoringEntity)
  }
}
