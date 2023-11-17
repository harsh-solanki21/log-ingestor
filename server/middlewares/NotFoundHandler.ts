import type { Request, Response } from 'express'

const NotFoundRoute = (req: Request, res: Response): Response => {
  return res.status(404).send('Page you are looking for not found!')
}

export default NotFoundRoute
