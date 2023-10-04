import { IUserEntity } from '@domain/entities/user'
import { instanceToInstance } from 'class-transformer'

export class UserMap {
  static toDtoWithoutPassword(user: IUserEntity): Partial<IUserEntity> {
    const userWithoutPassword = instanceToInstance({
      id: user.id,
      uuid: user.uuid,
      name: user.name,
      email: user.name,
      phone: user.phone,
      birthdate: user.birthdate,
      image: user.image,
    })

    return userWithoutPassword
  }
}
