import { body } from 'express-validator'

export const insertLogValidations = [
  body('*.level').isString().withMessage('level is required'),
  body('*.message').isString().withMessage('message is required'),
  body('*.resourceId').isString().withMessage('resourceId is required'),
  body('*.timestamp').isISO8601().withMessage('timestamp is required'),
  body('*.traceId').isString().withMessage('traceId is required'),
  body('*.spanId').isString().withMessage('spanId is required'),
  body('*.commit').isString().withMessage('commit is required'),
  body('*.metadata').isObject().withMessage('metadata is required')
]
