import { IPermissionEntity } from '@domain/entities/permission'

export const fakePermissionEntity: IPermissionEntity = {
  id: 1,
  uuid: 'ccaddbfd-db88-471f-91ae-4aa04609facb',
  name: 'new name',
  description: 'new description',
  permission_group: 'permissions',
  created_at: new Date(),
  updated_at: new Date(),
}
