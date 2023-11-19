import type { Request, Response } from 'express'
import pool from '../config/postgres'
import type { Log } from '../interfaces/Logs'
import { ingestLogs, searchLogsQuery } from '../data-access/Logs'
import { throwValidationErrors } from '../utils/RequestValidations'
import { BadRequest } from '../errors'

export const insertLogs = async (req: Request, res: Response): Promise<void> => {
  throwValidationErrors(req)

  try {
    const logs = req.body as Log[]
    await ingestLogs(logs)
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

export const searchLogs = async (req: Request, res: Response): Promise<void> => {
  throwValidationErrors(req)
  try {
    const query = req.query.q as string
    const result = await searchLogsQuery(query)
    res.status(200).json(result)
  } catch (error: any) {
    throw new BadRequest(error.message)
  }
}
