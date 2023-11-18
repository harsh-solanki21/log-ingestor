import { Pool } from 'pg'
import dotenv from 'dotenv'

dotenv.config()

const pool = new Pool({
  user: 'postgres',
  password: 'harsh21',
  host: 'localhost',
  port: 5432,
  database: 'log-ingestor'
})

export default pool
