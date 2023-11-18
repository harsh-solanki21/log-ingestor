import express from 'express'
import type { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import path from 'path'
import NotFoundRoute from './middlewares/NotFoundHandler'
import { loadRoutes } from './routes'

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(helmet())

const port: number = Number(process.env.PORT) ?? 3000

// Routes
loadRoutes(app)

if (process.env.NODE_ENV === 'prod') {
  app.use(express.static(path.join(__dirname, '../client/build')))
  app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, '../', 'client', 'build', 'index.html'))
  })
} else {
  app.get('/', (req: Request, res: Response) => {
    res.send('Please set environment to production')
  })
}

app.use(NotFoundRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
