import {
  IPermissionRepository,
  IPermissionRepositoryToken,
} from '@business/repositories/permission/iPermissionRepository'
import {
  ILoggerService,
  ILoggerServiceToken,
} from '@business/services/logger/iLogger'
import { inject, injectable } from 'inversify'
import {
  IInputFindByPermissionDto,
  IOutputFindByPermissionDto,
} from '@business/dto/permission/findBy'
import { left, right } from '@shared/either'
import { PermissionErrors } from '@business/module/errors/permissionErrors'
import { IAbstractUseCase } from '../abstractUseCase'

@injectable()
export class FindByPermissionUseCase
  implements
    IAbstractUseCase<IInputFindByPermissionDto, IOutputFindByPermissionDto>
{
  constructor(
    @inject(IPermissionRepositoryToken)
    private permissionRepository: IPermissionRepository,
    @inject(ILoggerServiceToken)
    private loggerService: ILoggerService
  ) {}

  async exec(
    props: IInputFindByPermissionDto
  ): Promise<IOutputFindByPermissionDto> {
    try {
      const permissionResult = await this.permissionRepository.findBy(props)

      if (!permissionResult) {
        return left(PermissionErrors.notFound())
      }

      return right(permissionResult)
    } catch (err) {
      this.loggerService.error(err)
      return left(PermissionErrors.internalError())
    }
  }
}
