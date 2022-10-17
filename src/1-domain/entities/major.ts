import { AbstractEntity } from '@domain/abstractEntity'
import { ITimestamps } from '@domain/timestamps'
import { right, Right } from '@shared/either'

export enum IShift {
  MORNING = 'manhã',
  AFTERNOON = 'tarde',
  NIGHT = 'noite',
  FULL_SHIFT = 'integral',
}

export interface IMajorEntity extends ITimestamps {
  id: number
  uuid: string
  name: string
  shift: IShift
}

export type IInputMajorEntity = Pick<IMajorEntity, 'name' | 'shift'>

export class MajorEntity extends AbstractEntity<IMajorEntity> {
  static create(
    props: IInputMajorEntity,
    currentDate: Date
  ): Right<void, MajorEntity> {
    const majorEntity = new MajorEntity({
      id: undefined,
      uuid: undefined,
      created_at: currentDate,
      updated_at: currentDate,
      ...props,
    })
    return right(majorEntity)
  }

  static update(
    props: Partial<IMajorEntity>,
    currentDate: Date
  ): Right<void, MajorEntity> {
    const majorEntity = new MajorEntity({
      ...props,
      updated_at: currentDate,
    } as IMajorEntity)
    return right(majorEntity)
  }
}
