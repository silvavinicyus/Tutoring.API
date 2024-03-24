import { IInputCreateFileDto } from '@business/dto/file/create'
import { IInputDeleteFileDto } from '@business/dto/file/delete'
import { IInputFindByFileDto } from '@business/dto/file/findBy'
import { FileErrors } from '@business/module/errors/file'
import { IFileRepositoryToken } from '@business/repositories/file/iFileRepository'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { CreateFileUseCase } from '@business/useCases/file/createFile'
import { DeleteFileUseCase } from '@business/useCases/file/deleteFile'
import { FindByFileUseCase } from '@business/useCases/file/findByFile'
import { container } from '@shared/ioc/container'
import { fakeFileEntity } from '@tests/mock/entities/fakeFileEntity'
import {
  FakeFileRepository,
  fakeFileRepositoryCreate,
  fakeFileRepositoryDelete,
  fakeFileRepositoryFindBy,
} from '@tests/mock/repositories/fakeFileRepository'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'
import { FakeUniqueIdentifierService } from '@tests/mock/services/fakeUniqueIdentifierService'

describe('File Use Cases', () => {
  beforeAll(() => {
    container.bind(IFileRepositoryToken).to(FakeFileRepository)
    container.bind(ILoggerServiceToken).to(FakeLoggerService)
    container
      .bind(IUniqueIdentifierServiceToken)
      .to(FakeUniqueIdentifierService)
  })

  afterAll(() => {
    container.unbindAll()
  })

  describe('Create File Use case', () => {
    const input: IInputCreateFileDto = {
      key: 'file_key.png',
      name: 'file name',
      type: 'file type',
    }

    test('Should fail to create a file  if repository failed', async () => {
      fakeFileRepositoryCreate.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(CreateFileUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(FileErrors.creationError())
    })

    test('Should have success to create a file', async () => {
      fakeFileRepositoryCreate.mockImplementationOnce(
        async () => fakeFileEntity
      )

      const sut = container.get(CreateFileUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })

  describe('Delete File Use Case', () => {
    const input: IInputDeleteFileDto = {
      id: 1,
    }

    test('Should fail to delete a file if repository failed', async () => {
      fakeFileRepositoryDelete.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(DeleteFileUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(FileErrors.deleteFailed())
    })

    test('Should fail to delete a file if repository failed', async () => {
      fakeFileRepositoryDelete.mockImplementationOnce(async () => void 0)

      const sut = container.get(DeleteFileUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })

  describe('Find by File Use Case', () => {
    const input: IInputFindByFileDto = {
      where: [
        {
          column: 'key',
          value: 'file_key',
        },
      ],
    }

    test('Should fail to find a file if repository failed', async () => {
      fakeFileRepositoryFindBy.mockImplementationOnce(async () => {
        throw new Error()
      })

      const sut = container.get(FindByFileUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(FileErrors.loadFailed())
    })

    test('Should fail to find a file if file does not exists', async () => {
      fakeFileRepositoryFindBy.mockImplementationOnce(async () => undefined)

      const sut = container.get(FindByFileUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(FileErrors.notFound())
    })

    test('Should have success to find a file', async () => {
      fakeFileRepositoryFindBy.mockImplementationOnce(
        async () => fakeFileEntity
      )

      const sut = container.get(FindByFileUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })
})
