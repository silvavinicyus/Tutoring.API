import { IInputDeleteFileDto } from '@business/dto/file/delete'
import { IInputFindByFileDto } from '@business/dto/file/findBy'
import { IFileRepository } from '@business/repositories/file/iFileRepository'
import { IFileEntity } from '@domain/entities/file'
import { injectable } from 'inversify'

@injectable()
export class FakeFileRepository implements IFileRepository {
  create(_input: IFileEntity): Promise<IFileEntity> {
    return void 0
  }
  findBy(_input: IInputFindByFileDto): Promise<IFileEntity> {
    return void 0
  }
  delete(_input: IInputDeleteFileDto): Promise<void> {
    return void 0
  }
}

export const fakeFileRepositoryCreate = jest.spyOn(
  FakeFileRepository.prototype,
  'create'
)

export const fakeFileRepositoryDelete = jest.spyOn(
  FakeFileRepository.prototype,
  'delete'
)

export const fakeFileRepositoryFindBy = jest.spyOn(
  FakeFileRepository.prototype,
  'findBy'
)
