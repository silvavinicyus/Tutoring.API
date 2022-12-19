import { FindStudentByUuidUseCase } from '@business/useCases/student/findStudentByUuid'
import { VerifyAuthenticationOperator } from '@controller/operations/auth/verifyAuthentication'
import { StudentRepositorySequelize } from '@framework/repositories/sequelize/student'
import { LoggerService } from '@framework/services/logger/loggerService'
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
  const deny = () => generatePolicy('MS_AUTH', {}, 'Deny', event.methodArn)

  if (event.type !== 'TOKEN') return deny()

  try {
    const input = {
      token: event.authorizationToken.split(' ')[1],
    }

    const logger = new LoggerService()

    const repository = new StudentRepositorySequelize(logger)

    const useCase = new FindStudentByUuidUseCase(repository)

    const operator = new VerifyAuthenticationOperator(useCase)

    // const operator = container.get(VerifyAuthenticationOperator)

    const result = await operator.run({ bearer: input.token })

    if (result.isLeft()) {
      throw result.value
    }

    return generatePolicy(randomUUID(), {}, 'Allow', event.methodArn)
  } catch (err) {
    console.log(err)
    return deny()
  }
}

export const handler = middyfy(authorization)
