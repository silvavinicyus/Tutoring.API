import { IInputFindCourseByUuidDto } from '@business/dto/course/findCourseByUuidDto'
import { IsNotEmpty, IsUUID } from 'class-validator'
import { AbstractSerializer } from '../abstractSerializer'

export class InputShowCourse extends AbstractSerializer<IInputFindCourseByUuidDto> {
  @IsUUID()
  @IsNotEmpty()
  uuid: string
}
