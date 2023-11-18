export interface Log {
  id: number
  level: string
  message: string
  resourceId: string
  timestamp: string
  traceId: string
  spanId: string
  commit: string
  metadata: JSON
}
