import type { Request, Response } from 'express'
import pool from '../config/pg'
import type { Log } from '../interfaces/Logs'
// import { throwValidationErrors } from '../utils/RequestValidations'
import { BadRequest } from '../errors'

export const insertLogs = async (req: Request, res: Response): Promise<void> => {
  // throwValidationErrors(req)
  const logs = req.body as Log[]

  try {
    await pool.query('BEGIN')

    const query = 'INSERT INTO logs (level, message, resourceId, timestamp, traceId, spanId, commit, metadata) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *'

    for (const log of logs) {
      await pool.query(query, [log.level, log.message, log.resourceId, log.timestamp, log.traceId, log.spanId, log.commit, log.metadata])
    }

    await pool.query('COMMIT')

    res.status(201).json({ message: 'Logs inserted successfully' })
  } catch (error: any) {
    await pool.query('ROLLBACK')
    throw new BadRequest(error.message)
  }
}
