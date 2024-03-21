import { IRoleEntity } from '@domain/entities/role'

export const fakeRoleEntity: IRoleEntity = {
  id: 1,
  uuid: 'ccaddbfd-db88-471f-91ae-4aa04609facb',
  name: 'new name',
  description: 'new description',
  created_at: new Date(),
}
