import { IInputDeletePrivateFileDto } from '@business/dto/storage/deletePrivateFile'
import { IInputSavePrivateFileDto } from '@business/dto/storage/savePrivateFile'
import { StorageErrors } from '@business/module/errors/storageErrors'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { IS3StorageServiceToken } from '@business/services/s3Storage/iS3Storage'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { DeletePrivateFileUseCase } from '@business/useCases/storage/deletePrivateFile'
import { SavePrivateFileUseCase } from '@business/useCases/storage/savePrivateFile'
import { container } from '@shared/ioc/container'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'
import {
  FakeStorageService,
  fakeStorageServiceDeletePrivateFile,
  fakeStorageServiceSavePrivateFile,
} from '@tests/mock/services/fakeStorageService'
import { FakeUniqueIdentifierService } from '@tests/mock/services/fakeUniqueIdentifierService'

describe('Storage Use Cases', () => {
  beforeAll(() => {
    container.bind(IS3StorageServiceToken).to(FakeStorageService)
    container.bind(ILoggerServiceToken).to(FakeLoggerService)
    container
      .bind(IUniqueIdentifierServiceToken)
      .to(FakeUniqueIdentifierService)
  })

  afterAll(() => {
    container.unbindAll()
  })

  describe('Save Private File', () => {
    const input: IInputSavePrivateFileDto = {
      file: {
        content: Buffer.from('aksdj'),
        enconding: 'encoding',
        filename: 'filename',
        mimetype: 'mimetype',
        truncated: true,
      },
      key: 'file_key',
    }

    test('Should fail to storage a file if storage service failed', async () => {
      fakeStorageServiceSavePrivateFile.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(SavePrivateFileUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(StorageErrors.failedToSavePrivateFile())
    })

    test('Should have success to storage a file', async () => {
      fakeStorageServiceSavePrivateFile.mockImplementationOnce(
        async () => void 0
      )

      const sut = container.get(SavePrivateFileUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })

  describe('Delete Private File', () => {
    const input: IInputDeletePrivateFileDto = {
      key: 'file_key',
    }

    test('Should fail to delete a file if service failed', async () => {
      fakeStorageServiceDeletePrivateFile.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(DeletePrivateFileUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(StorageErrors.failedToDeletePrivateFile())
    })

    test('Should have success to delete a file', async () => {
      fakeStorageServiceDeletePrivateFile.mockImplementationOnce(
        async () => void 0
      )

      const sut = container.get(DeletePrivateFileUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })
})
