// import { IOutputAuthenticateDto } from '@business/dto/auth/authenticateDto'
// import { AuthErrors } from '@business/module/errors/authErrors'
// import { AuthenticateUseCase } from '@business/useCases/auth/authenticate'
// import { FindStudentByEmailUseCase } from '@business/useCases/student/findStudentByEmail'
// import { InputAuthenticate } from '@controller/serializers/auth/authenticate'
// import { left } from '@shared/either'
// import { inject, injectable } from 'inversify'
// import { AbstractOperator } from '../abstractOperator'

// @injectable()
// export class AuthenticateOperator extends AbstractOperator<
//   InputAuthenticate,
//   IOutputAuthenticateDto
// > {
//   constructor(
//     @inject(FindStudentByEmailUseCase)
//     private findStudent: FindStudentByEmailUseCase,
//     @inject(AuthenticateUseCase)
//     private authenticate: AuthenticateUseCase
//   ) {
//     super()
//   }

//   async run(input: InputAuthenticate): Promise<IOutputAuthenticateDto> {
//     this.exec(input)

//     const student = await this.findStudent.exec({ email: input.email })

//     if (student.isLeft()) {
//       return left(AuthErrors.notAllowed())
//     }

//     const response = await this.authenticate.exec({
//       student: student.value,
//       password: input.password,
//     })

//     if (response.isLeft()) {
//       return left(response.value)
//     }

//     return response
//   }
// }
