import { describe, expect, it } from 'vitest'
import { trpc, trpcClient } from './trpc'

describe('trpc client', () => {
  it('exports trpc react hooks', () => {
    expect(trpc).toBeDefined()
    expect(typeof trpc.Provider).toBe('function')
  })

  it('exports trpcClient', () => {
    expect(trpcClient).toBeDefined()
  })
})
