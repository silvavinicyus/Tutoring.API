import { IRoleRepository } from '@business/repositories/role/iRoleRepository'
import { IRoleEntity } from '@domain/entities/role'
import { injectable } from 'inversify'

@injectable()
export class FakeRoleRepository implements IRoleRepository {
  create(_props: IRoleEntity): Promise<IRoleEntity> {
    return void 0
  }
}

export const fakeRoleRepositoryCreate = jest.spyOn(
  FakeRoleRepository.prototype,
  'create'
)
