import { FileEntity } from '@domain/entities/file'
import { fakeFileEntity } from '@tests/mock/entities/fakeFileEntity'

describe('File Entity', () => {
  describe('Create Method', () => {
    test('Should be able to create a new file', async () => {
      const fileEntity = FileEntity.create(fakeFileEntity, new Date())

      expect(fileEntity.isLeft()).toBeFalsy()
      expect(fileEntity.isRight()).toBeTruthy()
    })
  })
})
