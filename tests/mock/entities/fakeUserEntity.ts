import { IUserEntity } from '@domain/entities/user'
import { fakeRoleEntity } from './fakeRoleEntity'
import { fakePermissionEntity } from './fakePermissionEntity'

export const fakeUserEntity: IUserEntity = {
  id: 1,
  uuid: 'ccaddbfd-db88-471f-91ae-4aa04609facb',
  birthdate: new Date(),
  email: 'email@gmail.com',
  name: 'new name',
  password: 'password',
  phone: '82 891929292',
  role_id: 1,
  user_real_id: 1,
  user_real_uuid: 'ccaddbfd-db88-471f-91ae-4aa04609facb',
  image_id: null,
  created_at: new Date(),
  updated_at: new Date(),
  role: {
    ...fakeRoleEntity,
    permissions: [fakePermissionEntity, fakePermissionEntity],
  },
}
