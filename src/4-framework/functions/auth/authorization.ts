import '@framework/ioc/inversify.config'
import { VerifyAuthenticationOperator } from '@controller/operations/auth/verifyAuthentication'
import { middyfy } from '@framework/utility/lambda'
import { container } from '@shared/ioc/container'
import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda'

export type IHandlerAuthorization = APIGatewayTokenAuthorizerEvent

export type IPolicy = {
  principalId: string
  policyDocument: {
    Version: '2012-10-17'
    Statement: {
      Action: string
      Effect: 'Allow' | 'Deny'
      Resource: string
    }[]
  }
  context: {
    [k: string]: unknown
  }
}

export const generatePolicy = (
  principalId: string,
  context: Record<string | number | symbol, unknown> = {},
  effect: 'Allow' | 'Deny' = 'Deny',
  resourceArn = ''
): IPolicy => ({
  principalId,
  policyDocument: {
    Version: '2012-10-17',
    Statement: [
      {
        Action: 'execute-api:Invoke',
        Effect: effect,
        Resource: resourceArn,
      },
    ],
  },
  context,
})

const authorization = async (
  event: IHandlerAuthorization
): Promise<IPolicy> => {
  console.log('CHegou no authorization')
  const deny = () => generatePolicy('MS_AUTH', {}, 'Deny', event.methodArn)

  if (event.type !== 'TOKEN') return deny()

  try {
    const input = {
      token: event.authorizationToken.split(' ')[1],
    }

    const operator = container.get(VerifyAuthenticationOperator)

    const result = await operator.run({ bearer: input.token })

    if (result.isLeft()) {
      throw result.value
    }

    console.log(
      `\nGenerating allow policy for: ${result.value.email}\n Arn: ${event.methodArn}`
    )

    return generatePolicy(
      result.value.email,
      {
        ...result.value,
      },
      'Allow',
      event.methodArn
    )
  } catch (err) {
    console.log(err)
    return deny()
  }
}

export const handler = middyfy(authorization)
