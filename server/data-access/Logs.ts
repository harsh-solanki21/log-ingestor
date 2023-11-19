import client from '../config/elasticSearch'

export const ingestLogs = async (logs: any[]): Promise<void> => {
  await createIndexAndMapping()

  await client.index({
    index: 'logs',
    body: logs
  })
}

export const searchLogsQuery = async (query: string): Promise<any> => {
  await createIndexAndMapping()

  const result = await client.search({
    index: 'logs',
    body: {
      query: {
        multi_match: {
          query,
          fields: ['level', 'message', 'resourceId', 'timestamp', 'traceId', 'spanId', 'commit', 'metadata']
        }
      }
    }
  })

  return result
}

const createIndexAndMapping = async (): Promise<void> => {
  const indexExists = await client.indices.exists({ index: 'logs' })

  if (!indexExists) {
    await client.indices.create({
      index: 'logs',
      body: {
        mappings: {
          properties: {
            level: { type: 'keyword' },
            message: { type: 'text' },
            resourceId: { type: 'keyword' },
            timestamp: { type: 'date' },
            traceId: { type: 'keyword' },
            spanId: { type: 'keyword' },
            commit: { type: 'keyword' },
            metadata: {
              properties: {
                parentResourceId: { type: 'keyword' }
              }
            }
          }
        }
      }
    })
  }
}
