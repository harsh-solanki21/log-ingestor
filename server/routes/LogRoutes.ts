import { Router } from 'express'
import { insertLogValidations } from '../validations/LogsValidations'
import { insertLogs } from '../controllers/LogsController'

const router: Router = Router()

router.post('/insert', [...insertLogValidations], insertLogs)

export default router
