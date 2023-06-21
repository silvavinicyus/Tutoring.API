import {
  IDateService,
  IDateServiceToken,
} from '@business/services/date/iDateService'
import {
  IEncryptionService,
  IEncryptionServiceToken,
} from '@business/services/encryption/iEncryption'
import { ILoggerServiceToken } from '@business/services/logger/iLogger'
import {
  IUniqueIdentifierService,
  IUniqueIdentifierServiceToken,
} from '@business/services/uniqueIdentifier/iUniqueIdentifier'
import { DateService } from '@framework/services/date/dateService'
import { EncryptionService } from '@framework/services/encryption/encryptionService'
import { LoggerService } from '@framework/services/logger/loggerService'
import { UniqueIdentifierService } from '@framework/services/uniqueIdentifier/uniqueIdentifierService'
import { ContainerModule, interfaces } from 'inversify'

export const servicesModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUniqueIdentifierService>(IUniqueIdentifierServiceToken).to(
    UniqueIdentifierService
  )
  bind(ILoggerServiceToken).to(LoggerService)
  bind<IDateService>(IDateServiceToken).to(DateService)
  bind<IEncryptionService>(IEncryptionServiceToken).to(EncryptionService)
})
