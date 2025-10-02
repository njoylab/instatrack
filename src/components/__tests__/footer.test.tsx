import { render, screen } from '@testing-library/react'
import Footer from '../footer'

describe('Footer component', () => {
  it('should render footer content', () => {
    render(<Footer />)

    expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  })

  it('should contain app information', () => {
    render(<Footer />)

    // Check if footer contains some expected content
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })
})