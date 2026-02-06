import { describe, expect, it } from 'vitest'
import { appRouter } from './trpc'

describe('appRouter', () => {
  const caller = appRouter.createCaller({})

  describe('health', () => {
    it('returns ok status', async () => {
      const result = await caller.health()
      expect(result.status).toBe('ok')
    })
  })
})
