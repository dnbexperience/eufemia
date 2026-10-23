import { describe, it, expect } from 'vitest'
import {
  aggregateMcpUsageRaw,
  aggregatePortalViewsRaw,
} from '../src/lambda/retrieve.js'

describe('aggregateMcpUsageRaw', () => {
  it('rejects a non-date sinceDt before running any query', async () => {
    await expect(aggregateMcpUsageRaw("2026'; DROP")).rejects.toThrow(
      'YYYY-MM-DD'
    )
  })
})

describe('aggregatePortalViewsRaw', () => {
  it('rejects a non-date sinceDt before running any query', async () => {
    await expect(aggregatePortalViewsRaw("2026'; DROP")).rejects.toThrow(
      'YYYY-MM-DD'
    )
  })
})
