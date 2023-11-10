import '@framework/ioc/inversify.config'
import { CreateUserOperator } from '@controller/operations/user/create'
import { InputCreateUser } from '@controller/serializers/user/createUser'
import { middyfy } from '@framework/utility/lambda'
import { container } from '@shared/ioc/container'
import { SNSEvent } from 'aws-lambda'

const createUser = async (event: SNSEvent): Promise<void> => {
  try {
    const message = JSON.parse(event.Records[0].Sns.Message)
    console.log(message)

    const input = new InputCreateUser({
      birthdate: new Date(message.birthdate),
      email: message.email,
      name: message.name,
      password: message.password,
      phone: message.phone,
      user_real_id: message.id,
      user_real_uuid: message.uuid,
    })

    console.log(input)

    const operator = container.get(CreateUserOperator)
    const userResult = await operator.run(input)

    if (userResult.isLeft()) {
      throw userResult.value
    }

    console.info('User was succesfully created')
  } catch (err) {
    console.info('Failed to create user')
    console.log(err)
  }
}

export const handler = middyfy(createUser)
