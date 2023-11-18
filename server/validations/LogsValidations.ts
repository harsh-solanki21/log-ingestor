import { body } from 'express-validator'

export const insertLogValidations = [
  body('level').exists().notEmpty().isString().withMessage('level is required'),
  body('message').exists().notEmpty().isString().withMessage('message is required'),
  body('resourceId').exists().notEmpty().isString().withMessage('resourceId is required'),
  body('timestamp').exists().notEmpty().isISO8601().withMessage('timestamp is required'),
  body('traceId').exists().notEmpty().isString().withMessage('traceId is required'),
  body('spanId').exists().notEmpty().isString().withMessage('spanId is required'),
  body('commit').exists().notEmpty().isString().withMessage('commit is required'),
  body('metadata').exists().notEmpty().isJSON().withMessage('metadata is required')
]
