import { IFileEntity } from '@domain/entities/file'

export const fakeFileEntity: IFileEntity = {
  id: 1,
  uuid: 'ccaddbfd-db88-471f-91ae-4aa04609facb',
  name: 'new name',
  type: 'type',
  key: 'key',
  created_at: new Date(),
  updated_at: new Date(),
}
