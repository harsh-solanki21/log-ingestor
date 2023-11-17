import type { Express } from 'express'
import AuthRoutes from './AuthRoutes'

export const loadRoutes = (app: Express): void => {
  app.use('/api/v1/auth', [], AuthRoutes)
}
