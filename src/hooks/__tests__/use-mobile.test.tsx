import { renderHook } from '@testing-library/react'
import { useIsMobile } from '../use-mobile'

// Mock window.matchMedia
const mockMatchMedia = (matches: boolean, innerWidth = 1024) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })

  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: innerWidth,
  })
}

describe('useIsMobile hook', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return true for mobile screen size', () => {
    mockMatchMedia(true, 480) // Mobile width

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(true)
  })

  it('should return false for desktop screen size', () => {
    mockMatchMedia(false, 1024) // Desktop width

    const { result } = renderHook(() => useIsMobile())

    expect(result.current).toBe(false)
  })

  it('should use correct media query', () => {
    mockMatchMedia(false)

    renderHook(() => useIsMobile())

    expect(window.matchMedia).toHaveBeenCalledWith('(max-width: 767px)')
  })
})