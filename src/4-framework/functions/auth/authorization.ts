import { FindStudentByUuidUseCase } from '@business/useCases/student/findStudentByUuid'
import { VerifyAuthenticationOperator } from '@controller/operations/auth/verifyAuthentication'
import { StudentRepositorySequelize } from '@framework/repositories/sequelize/student'
import { LoggerService } from '@framework/services/logger/loggerService'
import { middyfy } from '@framework/utility/lambda'
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

    const result = await operator.run({ bearer: input.token })

    if (result.isLeft()) {
      throw result.value
    }

    console.log(
      `\nGenerating allow policy for: ${
        result.value.registration_number || result.value.email
      }\n Arn: ${event.methodArn}`
    )

    console.log({ ...result.value })

    return generatePolicy(
      result.value.registration_number || result.value.email,
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
