import '@framework/ioc/inversify.config'
import { CreateOrUpdateUserOperator } from '@controller/operations/user/createOrUpdate'
import { InputCreateUser } from '@controller/serializers/user/createUser'
import { middyfy } from '@framework/utility/lambda'
import { container } from '@shared/ioc/container'
import { SNSEvent } from 'aws-lambda'
import { InputDeleteUser } from '@controller/serializers/user/deleteUser'
import { DeleteUserOperator } from '@controller/operations/user/deleteUser'

const createOrUpdate = async (event: SNSEvent): Promise<void> => {
  try {
    const { user, deleted } = JSON.parse(event.Records[0].Sns.Message)

    console.log({ user, deleted })

    if (!deleted) {
      const input = new InputCreateUser({
        birthdate: new Date(user.birthdate),
        email: user.email,
        name: user.name,
        password: user.password,
        phone: user.phone,
        user_real_id: user.id,
        user_real_uuid: user.uuid,
      })

      console.log(input)

      const operator = container.get(CreateOrUpdateUserOperator)
      const userResult = await operator.run(input)

      if (userResult.isLeft()) {
        throw userResult.value
      }

      console.info('User was succesfully created')
    } else {
      const input = new InputDeleteUser({
        id: user.id,
      })

      const operator = container.get(DeleteUserOperator)
      const result = await operator.run(input)

      if (result.isLeft()) {
        throw result.value
      }

      console.info('User was succesfully deleted')
    }
  } catch (err) {
    console.info('Failed to create or update user')
    console.log(err)
  }
}

export const handler = middyfy(createOrUpdate)
