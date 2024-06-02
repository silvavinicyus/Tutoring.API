import { FileErrors } from '@business/module/errors/file'
import { StorageErrors } from '@business/module/errors/storageErrors'
import { TransactionErrors } from '@business/module/errors/transactionErrors'
import { UserErrors } from '@business/module/errors/user'
import { IFileRepositoryToken } from '@business/repositories/file/iFileRepository'
import { ITransactionRepositoryToken } from '@business/repositories/transaction/iTransactionRepository'
import { IUserRepositoryToken } from '@business/repositories/user/iUserRepository'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import { IS3StorageServiceToken } from '@business/services/s3Storage/iS3Storage'
import { IUniqueIdentifierServiceToken } from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { CreateFileUseCase } from '@business/useCases/file/createFile'
import { DeleteFileUseCase } from '@business/useCases/file/deleteFile'
import { FindByFileUseCase } from '@business/useCases/file/findByFile'
import { DeletePrivateFileUseCase } from '@business/useCases/storage/deletePrivateFile'
import { SavePrivateFileUseCase } from '@business/useCases/storage/savePrivateFile'
import { CreateTransactionUseCase } from '@business/useCases/transaction/CreateTransactionUseCase'
import { FindByUserUseCase } from '@business/useCases/user/findByUser'
import { UpdateUserUseCase } from '@business/useCases/user/updateUser'
import { UploadUserImageOperator } from '@controller/operations/user/uploadImage'
import { InputUploadImage } from '@controller/serializers/user/uploadImage'
import { left, right } from '@shared/either'
import { container } from '@shared/ioc/container'
import { fakeAuthorizer } from '@tests/mock/entities/fakeAuthorizerEntity'
import { fakeFileEntity } from '@tests/mock/entities/fakeFileEntity'
import { fakeTransaction } from '@tests/mock/entities/fakeTransactionEntity'
import { fakeUserEntity } from '@tests/mock/entities/fakeUserEntity'
import { FakeFileRepository } from '@tests/mock/repositories/fakeFileRepository'
import { FakeTransactionRepository } from '@tests/mock/repositories/fakeTransactionRepository'
import { FakeUserRepository } from '@tests/mock/repositories/fakeUserRepository'
import { FakeLoggerService } from '@tests/mock/services/fakeLoggerService'
import { FakeStorageService } from '@tests/mock/services/fakeStorageService'
import { FakeUniqueIdentifierService } from '@tests/mock/services/fakeUniqueIdentifierService'

describe('Upload Image Operator', () => {
  beforeAll(() => {
    container.bind(ILoggerServiceToken).to(FakeLoggerService).inSingletonScope()
    container
      .bind(IUniqueIdentifierServiceToken)
      .to(FakeUniqueIdentifierService)
      .inSingletonScope()
    container
      .bind(IUserRepositoryToken)
      .to(FakeUserRepository)
      .inSingletonScope()
    container
      .bind(IS3StorageServiceToken)
      .to(FakeStorageService)
      .inSingletonScope()
    container
      .bind(IFileRepositoryToken)
      .to(FakeFileRepository)
      .inSingletonScope()
    container
      .bind(ITransactionRepositoryToken)
      .to(FakeTransactionRepository)
      .inSingletonScope()
    container.bind(UpdateUserUseCase).toSelf().inSingletonScope()
    container.bind(FindByUserUseCase).toSelf().inSingletonScope()
    container.bind(SavePrivateFileUseCase).toSelf().inSingletonScope()
    container.bind(DeletePrivateFileUseCase).toSelf().inSingletonScope()
    container.bind(FindByFileUseCase).toSelf().inSingletonScope()
    container.bind(CreateFileUseCase).toSelf().inSingletonScope()
    container.bind(DeleteFileUseCase).toSelf().inSingletonScope()
    container.bind(CreateTransactionUseCase).toSelf().inSingletonScope()
  })

  afterAll(() => {
    container.unbindAll()
  })

  const input = new InputUploadImage({
    file: {
      content: Buffer.from('asdas'),
      enconding: 'utf8',
      filename: 'filename',
      mimetype: 'mimetype',
      truncated: true,
    },
  })

  test('Should fail to upload a user image if user fail', async () => {
    const findByUser = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUser, 'exec')
      .mockImplementationOnce(async () => left(UserErrors.loadFailed()))
    const sut = container.get(UploadUserImageOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(UserErrors.loadFailed())
  })

  test('Should fail to upload a user image if user does not exists', async () => {
    const findByUser = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUser, 'exec')
      .mockImplementationOnce(async () => left(UserErrors.notFound()))
    const sut = container.get(UploadUserImageOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(UserErrors.notFound())
  })

  test('Should fail to upload a user image if transcation creation failed', async () => {
    const findByUser = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUser, 'exec')
      .mockImplementationOnce(async () => right(fakeUserEntity))

    const createTransaction = container.get(CreateTransactionUseCase)
    jest
      .spyOn(createTransaction, 'exec')
      .mockImplementationOnce(async () =>
        left(TransactionErrors.creationError())
      )

    const sut = container.get(UploadUserImageOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(TransactionErrors.creationError())
  })

  test('Should fail to upload a user image if save private file failed', async () => {
    const findByUser = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUser, 'exec')
      .mockImplementationOnce(async () => right(fakeUserEntity))

    const createTransaction = container.get(CreateTransactionUseCase)
    jest
      .spyOn(createTransaction, 'exec')
      .mockImplementationOnce(async () => right(fakeTransaction))

    const savePrivateFile = container.get(SavePrivateFileUseCase)
    jest
      .spyOn(savePrivateFile, 'exec')
      .mockImplementationOnce(async () =>
        left(StorageErrors.failedToSavePrivateFile())
      )

    const sut = container.get(UploadUserImageOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(StorageErrors.failedToSavePrivateFile())
  })

  test('Should fail to upload a user image if create file failed', async () => {
    const findByUser = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUser, 'exec')
      .mockImplementationOnce(async () => right(fakeUserEntity))

    const createTransaction = container.get(CreateTransactionUseCase)
    jest
      .spyOn(createTransaction, 'exec')
      .mockImplementationOnce(async () => right(fakeTransaction))

    const savePrivateFile = container.get(SavePrivateFileUseCase)
    jest
      .spyOn(savePrivateFile, 'exec')
      .mockImplementationOnce(async () => right(void 0))

    const createFile = container.get(CreateFileUseCase)
    jest
      .spyOn(createFile, 'exec')
      .mockImplementationOnce(async () => left(FileErrors.creationError()))

    const sut = container.get(UploadUserImageOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(FileErrors.creationError())
  })

  test('Should fail to upload a user image if update user failed', async () => {
    const findByUser = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUser, 'exec')
      .mockImplementationOnce(async () => right(fakeUserEntity))

    const createTransaction = container.get(CreateTransactionUseCase)
    jest
      .spyOn(createTransaction, 'exec')
      .mockImplementationOnce(async () => right(fakeTransaction))

    const savePrivateFile = container.get(SavePrivateFileUseCase)
    jest
      .spyOn(savePrivateFile, 'exec')
      .mockImplementationOnce(async () => right(void 0))

    const createFile = container.get(CreateFileUseCase)
    jest
      .spyOn(createFile, 'exec')
      .mockImplementationOnce(async () => right(fakeFileEntity))

    const updateUser = container.get(UpdateUserUseCase)
    jest
      .spyOn(updateUser, 'exec')
      .mockImplementationOnce(async () => left(UserErrors.updateError()))

    const sut = container.get(UploadUserImageOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(UserErrors.updateError())
  })

  test('Should fail to upload a user image if failed to find past user image', async () => {
    const findByUser = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUser, 'exec')
      .mockImplementationOnce(async () =>
        right({ ...fakeUserEntity, image_id: 1 })
      )

    const createTransaction = container.get(CreateTransactionUseCase)
    jest
      .spyOn(createTransaction, 'exec')
      .mockImplementationOnce(async () => right(fakeTransaction))

    const savePrivateFile = container.get(SavePrivateFileUseCase)
    jest
      .spyOn(savePrivateFile, 'exec')
      .mockImplementationOnce(async () => right(void 0))

    const createFile = container.get(CreateFileUseCase)
    jest
      .spyOn(createFile, 'exec')
      .mockImplementationOnce(async () => right(fakeFileEntity))

    const updateUser = container.get(UpdateUserUseCase)
    jest
      .spyOn(updateUser, 'exec')
      .mockImplementationOnce(async () =>
        right({ ...fakeUserEntity, image_id: 1 })
      )

    const findImage = container.get(FindByFileUseCase)
    jest
      .spyOn(findImage, 'exec')
      .mockImplementationOnce(async () => left(FileErrors.notFound()))

    const sut = container.get(UploadUserImageOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(FileErrors.notFound())
  })

  test('Should fail to upload a user image if failed to delete past user image', async () => {
    const findByUser = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUser, 'exec')
      .mockImplementationOnce(async () =>
        right({ ...fakeUserEntity, image_id: 1 })
      )

    const createTransaction = container.get(CreateTransactionUseCase)
    jest
      .spyOn(createTransaction, 'exec')
      .mockImplementationOnce(async () => right(fakeTransaction))

    const savePrivateFile = container.get(SavePrivateFileUseCase)
    jest
      .spyOn(savePrivateFile, 'exec')
      .mockImplementationOnce(async () => right(void 0))

    const createFile = container.get(CreateFileUseCase)
    jest
      .spyOn(createFile, 'exec')
      .mockImplementationOnce(async () => right(fakeFileEntity))

    const updateUser = container.get(UpdateUserUseCase)
    jest
      .spyOn(updateUser, 'exec')
      .mockImplementationOnce(async () =>
        right({ ...fakeUserEntity, image_id: 1 })
      )

    const findImage = container.get(FindByFileUseCase)
    jest
      .spyOn(findImage, 'exec')
      .mockImplementationOnce(async () => right(fakeFileEntity))

    const deleteImage = container.get(DeleteFileUseCase)
    jest
      .spyOn(deleteImage, 'exec')
      .mockImplementationOnce(async () => left(FileErrors.deleteFailed()))

    const sut = container.get(UploadUserImageOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(FileErrors.deleteFailed())
  })

  test('Should fail to upload a user image if failed to remote past user image from storage', async () => {
    const findByUser = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUser, 'exec')
      .mockImplementationOnce(async () =>
        right({ ...fakeUserEntity, image_id: 1 })
      )

    const createTransaction = container.get(CreateTransactionUseCase)
    jest
      .spyOn(createTransaction, 'exec')
      .mockImplementationOnce(async () => right(fakeTransaction))

    const savePrivateFile = container.get(SavePrivateFileUseCase)
    jest
      .spyOn(savePrivateFile, 'exec')
      .mockImplementationOnce(async () => right(void 0))

    const createFile = container.get(CreateFileUseCase)
    jest
      .spyOn(createFile, 'exec')
      .mockImplementationOnce(async () => right(fakeFileEntity))

    const updateUser = container.get(UpdateUserUseCase)
    jest
      .spyOn(updateUser, 'exec')
      .mockImplementationOnce(async () =>
        right({ ...fakeUserEntity, image_id: 1 })
      )

    const findImage = container.get(FindByFileUseCase)
    jest
      .spyOn(findImage, 'exec')
      .mockImplementationOnce(async () => right(fakeFileEntity))

    const deleteImage = container.get(DeleteFileUseCase)
    jest
      .spyOn(deleteImage, 'exec')
      .mockImplementationOnce(async () => right(void 0))

    const deleteFromStorage = container.get(DeletePrivateFileUseCase)
    jest
      .spyOn(deleteFromStorage, 'exec')
      .mockImplementationOnce(async () =>
        left(StorageErrors.failedToDeletePrivateFile())
      )

    const sut = container.get(UploadUserImageOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeTruthy()
    expect(result.isRight()).toBeFalsy()
    expect(result.value).toEqual(StorageErrors.failedToDeletePrivateFile())
  })

  test('Should have success to upload and update a user image', async () => {
    const findByUser = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUser, 'exec')
      .mockImplementationOnce(async () => right(fakeUserEntity))

    const createTransaction = container.get(CreateTransactionUseCase)
    jest
      .spyOn(createTransaction, 'exec')
      .mockImplementationOnce(async () => right(fakeTransaction))

    const savePrivateFile = container.get(SavePrivateFileUseCase)
    jest
      .spyOn(savePrivateFile, 'exec')
      .mockImplementationOnce(async () => right(void 0))

    const createFile = container.get(CreateFileUseCase)
    jest
      .spyOn(createFile, 'exec')
      .mockImplementationOnce(async () => right(fakeFileEntity))

    const updateUser = container.get(UpdateUserUseCase)
    jest
      .spyOn(updateUser, 'exec')
      .mockImplementationOnce(async () =>
        right({ ...fakeUserEntity, image_id: 1 })
      )

    const findImage = container.get(FindByFileUseCase)
    jest
      .spyOn(findImage, 'exec')
      .mockImplementationOnce(async () => right(fakeFileEntity))

    const deleteImage = container.get(DeleteFileUseCase)
    jest
      .spyOn(deleteImage, 'exec')
      .mockImplementationOnce(async () => right(void 0))

    const deleteFromStorage = container.get(DeletePrivateFileUseCase)
    jest
      .spyOn(deleteFromStorage, 'exec')
      .mockImplementationOnce(async () => right(void 0))

    const sut = container.get(UploadUserImageOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })

  test('Should have success to upload and create a user image', async () => {
    const findByUser = container.get(FindByUserUseCase)
    jest
      .spyOn(findByUser, 'exec')
      .mockImplementationOnce(async () => right(fakeUserEntity))

    const createTransaction = container.get(CreateTransactionUseCase)
    jest
      .spyOn(createTransaction, 'exec')
      .mockImplementationOnce(async () => right(fakeTransaction))

    const savePrivateFile = container.get(SavePrivateFileUseCase)
    jest
      .spyOn(savePrivateFile, 'exec')
      .mockImplementationOnce(async () => right(void 0))

    const createFile = container.get(CreateFileUseCase)
    jest
      .spyOn(createFile, 'exec')
      .mockImplementationOnce(async () => right(fakeFileEntity))

    const updateUser = container.get(UpdateUserUseCase)
    jest
      .spyOn(updateUser, 'exec')
      .mockImplementationOnce(async () => right({ ...fakeUserEntity }))

    const sut = container.get(UploadUserImageOperator)
    const result = await sut.run(input, fakeAuthorizer)

    expect(result.isLeft()).toBeFalsy()
    expect(result.isRight()).toBeTruthy()
  })
})
