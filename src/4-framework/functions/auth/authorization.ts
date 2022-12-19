import { middyfy } from '@framework/utility/lambda'
import { APIGatewayTokenAuthorizerEvent } from 'aws-lambda'
import { randomUUID } from 'node:crypto'

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
  const deny = () => {
    console.log('Denying.')
    return generatePolicy('MS_AUTH', {}, 'Deny', event.methodArn)
  }

  if (event.type !== 'TOKEN') {
    return deny()
  }

  try {
    const input = {
      token: event.authorizationToken.split(' ')[1],
    }

    console.log({ input })

    return generatePolicy(randomUUID(), {}, 'Allow', event.methodArn)
  } catch (err) {
    console.log(err)
    return deny()
  }
}

export const handler = middyfy(authorization)
