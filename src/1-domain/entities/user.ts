export interface IUserEntity {
  id: number
  uuid: string
  name: string
  email: string
  registration_number: string
  cpf: string
  img_url?: string
  device_token: string
  password: string
}
