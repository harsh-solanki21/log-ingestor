import express from 'express'
import type { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import path from 'path'
import NotFoundRoute from './middlewares/NotFoundHandler'
import { loadRoutes } from './routes'
import pool from './config/pg'

dotenv.config()

const app: Express = express()

app.use(cors())
app.use(express.json())

const port: number = Number(process.env.PORT) ?? 3000

app.use(helmet())

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

const query = async (): Promise<void> => {
  const res = await pool.query('SELECT current_user')
  const currentUser = res.rows[0].current_user
  console.log(currentUser)
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
  query().then(() => {
    console.log('Connected to PostgreSQL')
  }
  ).catch((err) => {
    console.error(err)
  })
})
