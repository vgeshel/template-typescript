/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { TrpcProvider } from './providers'

describe('TrpcProvider', () => {
  it('renders children', () => {
    render(
      <TrpcProvider>
        <div>test child</div>
      </TrpcProvider>,
    )
    expect(screen.getByText('test child')).toBeDefined()
  })
})
