// eslint-disable-next-line import/no-extraneous-dependencies
import { Router } from 'express'
import userRoutes from './userRoutes'

const router = Router()

router.use('/user', userRoutes)

export default router
