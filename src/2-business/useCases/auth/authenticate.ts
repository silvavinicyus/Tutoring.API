// import {
//   IInputAuthenticateDto,
//   IOutputAuthenticateDto,
// } from '@business/dto/auth/authenticateDto'
// import { AuthErrors } from '@business/module/errors/authErrors'
// import { StudentMap } from '@business/utils/studentMapper'
// import { left, right } from '@shared/either'
// import { compare } from 'bcrypt'
// import { injectable } from 'inversify'
// import { sign } from 'jsonwebtoken'
// import { IAbstractUseCase } from '../abstractUseCase'

// @injectable()
// export class AuthenticateUseCase
//   implements IAbstractUseCase<IInputAuthenticateDto, IOutputAuthenticateDto>
// {
//   async exec(props: IInputAuthenticateDto): Promise<IOutputAuthenticateDto> {
//     const passwordMatch = await compare(props.password, props.student.password)

//     if (!passwordMatch) {
//       return left(AuthErrors.notAllowed())
//     }

//     const token = sign(
//       { email: props.student.email },
//       process.env.SECRET_TOKEN,
//       {
//         subject: props.student.uuid,
//         expiresIn: process.env.EXPIRES_IN,
//       }
//     )

//     return right({
//       student: StudentMap.toDtoWithoutPassword(props.student),
//       token,
//     })
//   }
// }
