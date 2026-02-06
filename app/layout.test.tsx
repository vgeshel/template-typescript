/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

vi.mock('next/font/google', () => ({
  Geist: () => ({ variable: '--font-geist-sans' }),
  Geist_Mono: () => ({ variable: '--font-geist-mono' }),
}))

vi.mock('@/components/Providers', () => ({
  Providers: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}))

describe('RootLayout', () => {
  it('renders children inside html and body', async () => {
    const { default: RootLayout, metadata } = await import('./layout')
    render(
      <RootLayout>
        <div>page content</div>
      </RootLayout>,
    )
    expect(screen.getByText('page content')).toBeDefined()
    expect(metadata.title).toBe('My Application')
    expect(metadata.description).toBe('A TypeScript + Next.js application')
  })
})
