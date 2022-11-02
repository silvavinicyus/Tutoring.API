import { IStudentEntity } from '@domain/entities/student'
import { instanceToInstance } from 'class-transformer'

export class StudentMap {
  static toDtoWithoutPassword(
    student: IStudentEntity
  ): Partial<IStudentEntity> {
    const studentWithoutPassword = instanceToInstance({
      id: student.id,
      uuid: student.uuid,
      name: student.name,
      email: student.name,
      registration_number: student.registration_number,
      cpf: student.cpf,
      img_url: student.img_url ? student.img_url : null,
      major_id: student.major_id,
      period: student.period,
      records_url: student.records_url,
    })

    return studentWithoutPassword
  }
}
