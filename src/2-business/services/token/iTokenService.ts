export interface IVerifyProps {
  bearer: string
  secret_token: string
}

export const ITokenServiceToken = Symbol.for('ITokenServiceToken')

export interface ITokenService {
  verify(props: IVerifyProps): { user_uuid: string }
}
