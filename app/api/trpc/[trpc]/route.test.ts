import { describe, expect, it } from 'vitest'
import { GET, POST } from './route'

describe('tRPC route handler', () => {
  it('handles GET requests', async () => {
    const req = new Request('http://localhost:3000/api/trpc/health', {
      method: 'GET',
    })
    const res = await GET(req)
    expect(res.status).toBe(200)
  })

  it('exports POST handler', () => {
    expect(typeof POST).toBe('function')
    expect(POST).toBe(GET)
  })
})
