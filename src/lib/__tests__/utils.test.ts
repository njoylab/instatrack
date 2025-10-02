import { cn } from '../utils'

describe('utils', () => {
  describe('cn function', () => {
    it('should merge class names correctly', () => {
      expect(cn('text-red-500', 'bg-blue-500')).toBe('text-red-500 bg-blue-500')
    })

    it('should handle Tailwind class conflicts', () => {
      expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
    })

    it('should handle conditional classes', () => {
      expect(cn('base-class', true && 'conditional-class')).toBe('base-class conditional-class')
      expect(cn('base-class', false && 'conditional-class')).toBe('base-class')
    })

    it('should handle empty or undefined values', () => {
      expect(cn('text-red-500', undefined, null, '')).toBe('text-red-500')
    })

    it('should handle arrays of classes', () => {
      expect(cn(['text-red-500', 'bg-blue-500'])).toBe('text-red-500 bg-blue-500')
    })

    it('should handle complex scenarios with conflicts and conditionals', () => {
      const isActive = true
      const isDisabled = false

      expect(cn(
        'base-class',
        'text-gray-500',
        isActive && 'text-blue-500',
        isDisabled && 'text-gray-300'
      )).toBe('base-class text-blue-500')
    })
  })
})