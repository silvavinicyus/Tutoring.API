import { IInputDeleteUserDto } from '@business/dto/user/delete'
import { IInputFindUserByDto } from '@business/dto/user/findBy'
import {
  IInputUpdateUser,
  IUserRepository,
} from '@business/repositories/user/iUserRepository'
import { IUserEntity } from '@domain/entities/user'
import { injectable } from 'inversify'

@injectable()
export class FakeUserRepository implements IUserRepository {
  create(_props: IUserEntity): Promise<IUserEntity> {
    return void 0
  }
  delete(_props: IInputDeleteUserDto): Promise<void> {
    return void 0
  }
  update(_props: IInputUpdateUser): Promise<Partial<IUserEntity>> {
    return void 0
  }
  findBy(_input: IInputFindUserByDto): Promise<IUserEntity> {
    return void 0
  }
}

export const fakeUserRepositoryCreate = jest.spyOn(
  FakeUserRepository.prototype,
  'create'
)

export const fakeUserRepositoryDelete = jest.spyOn(
  FakeUserRepository.prototype,
  'delete'
)

export const fakeUserRepositoryFindBy = jest.spyOn(
  FakeUserRepository.prototype,
  'findBy'
)

export const fakeUserRepositoryUpdate = jest.spyOn(
  FakeUserRepository.prototype,
  'update'
)
