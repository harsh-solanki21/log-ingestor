import { Router } from 'express'
import { insertLogValidations } from '../validations/LogsValidations'
import { insertLogs, searchLogs } from '../controllers/LogsController'

const router: Router = Router()

router.post('/insert', [...insertLogValidations], insertLogs)

router.post('/search', [], searchLogs)

export default router
