import type { Express } from 'express'
import AuthRoutes from './AuthRoutes'
import LogRoutes from './LogRoutes'

export const loadRoutes = (app: Express): void => {
  app.use('/api/v1/auth', [], AuthRoutes)
  app.use('/api/v1/logs', [], LogRoutes)
}
