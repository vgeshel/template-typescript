/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from './page'

describe('Home page', () => {
  it('renders heading and welcome text', () => {
    render(<Home />)
    expect(screen.getByText('Hello, World!')).toBeDefined()
    expect(
      screen.getByText('Welcome to your TypeScript + Next.js application.'),
    ).toBeDefined()
  })
})
