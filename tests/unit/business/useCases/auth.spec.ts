import { IInputAuthenticateDto } from '@business/dto/auth/authenticateDto'
import { AuthErrors } from '@business/module/errors/authErrors'
import { IEncryptionServiceToken } from '@business/services/encryption/iEncryption'
import { AuthenticateUseCase } from '@business/useCases/auth/authenticate'
import { container } from '@shared/ioc/container'
import { fakeUserEntity } from '@tests/mock/entities/fakeUserEntity'
import {
  FakeEncryptionService,
  fakeEncryptionServiceComparePassword,
} from '@tests/mock/services/fakeEncryptionService'

describe('Auth Use Case', () => {
  beforeAll(() => {
    container.bind(IEncryptionServiceToken).to(FakeEncryptionService)
  })

  afterAll(() => {
    container.unbindAll()
  })

  describe('Authenticate use case', () => {
    test('Should fail to authenticate if password does not match', async () => {
      const input: IInputAuthenticateDto = {
        password: 'admin',
        user: { ...fakeUserEntity, password: 'admin1' },
      }

      fakeEncryptionServiceComparePassword.mockImplementationOnce(
        async () => false
      )

      const sut = container.get(AuthenticateUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeTruthy()
      expect(result.isRight()).toBeFalsy()
      expect(result.value).toEqual(AuthErrors.notAllowed())
    })

    test('Should have succes to authenticate if passwords match', async () => {
      const input: IInputAuthenticateDto = {
        password: 'admin',
        user: { ...fakeUserEntity, password: 'admin' },
      }

      fakeEncryptionServiceComparePassword.mockImplementationOnce(
        async () => true
      )

      const sut = container.get(AuthenticateUseCase)
      const result = await sut.exec(input)

      expect(result.isLeft()).toBeFalsy()
      expect(result.isRight()).toBeTruthy()
    })
  })
})
