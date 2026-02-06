/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Providers } from './Providers'

describe('Providers', () => {
  it('renders children', () => {
    render(
      <Providers>
        <div>test child</div>
      </Providers>,
    )
    expect(screen.getByText('test child')).toBeDefined()
  })
})
