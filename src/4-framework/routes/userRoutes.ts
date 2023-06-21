import { CreateUserOperator } from '@controller/operations/user/createUser'
import { Router } from 'express'
import { container } from '@shared/ioc/container'

const userRoutes = Router()

const createUser = container.get(CreateUserOperator)

userRoutes.post('/', createUser.run)

export default userRoutes
