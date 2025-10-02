import { renderHook, act } from '@testing-library/react'
import { useSnapshots } from '../use-snapshots'
import type { Snapshot } from '@/lib/types'

const mockSnapshot1: Snapshot = {
  date: '2024-01-01T00:00:00.000Z',
  followers: [
    { username: 'user1', profileUrl: 'https://instagram.com/user1' }
  ],
  following: [
    { username: 'user2', profileUrl: 'https://instagram.com/user2' }
  ]
}

const mockSnapshot2: Snapshot = {
  date: '2024-01-02T00:00:00.000Z',
  followers: [
    { username: 'user1', profileUrl: 'https://instagram.com/user1' },
    { username: 'user3', profileUrl: 'https://instagram.com/user3' }
  ],
  following: [
    { username: 'user2', profileUrl: 'https://instagram.com/user2' }
  ]
}

describe('useSnapshots hook', () => {
  beforeEach(() => {
    localStorage.getItem.mockReturnValue(null)
    localStorage.setItem.mockClear()
    localStorage.removeItem.mockClear()
  })

  it('should initialize with empty snapshots when localStorage is empty', () => {
    const { result } = renderHook(() => useSnapshots())

    expect(result.current.snapshots).toEqual([])
    expect(result.current.isLoaded).toBe(true)
  })

  it('should load snapshots from localStorage on mount', () => {
    const savedSnapshots = [mockSnapshot1, mockSnapshot2]
    localStorage.getItem.mockReturnValue(JSON.stringify(savedSnapshots))

    const { result } = renderHook(() => useSnapshots())

    expect(result.current.snapshots).toEqual(savedSnapshots)
    expect(result.current.isLoaded).toBe(true)
  })

  it('should add a new snapshot and save to localStorage', () => {
    const { result } = renderHook(() => useSnapshots())

    act(() => {
      result.current.addSnapshot(mockSnapshot1)
    })

    expect(result.current.snapshots).toContain(mockSnapshot1)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'instaTrackSnapshots',
      JSON.stringify([mockSnapshot1])
    )
  })

  it('should sort snapshots by date when adding', () => {
    const { result } = renderHook(() => useSnapshots())

    act(() => {
      result.current.addSnapshot(mockSnapshot2) // Later date
    })

    act(() => {
      result.current.addSnapshot(mockSnapshot1) // Earlier date
    })

    expect(result.current.snapshots).toHaveLength(2)
    expect(result.current.snapshots[0]).toEqual(mockSnapshot1)
    expect(result.current.snapshots[1]).toEqual(mockSnapshot2)
  })

  it('should clear all snapshots and localStorage', () => {
    localStorage.getItem.mockReturnValue(JSON.stringify([mockSnapshot1]))
    const { result } = renderHook(() => useSnapshots())

    act(() => {
      result.current.clearSnapshots()
    })

    expect(result.current.snapshots).toEqual([])
    expect(localStorage.removeItem).toHaveBeenCalledWith('instaTrackSnapshots')
  })

  it('should restore snapshots from backup', () => {
    const { result } = renderHook(() => useSnapshots())
    const backupSnapshots = [mockSnapshot2, mockSnapshot1] // Unsorted

    act(() => {
      result.current.restoreSnapshots(backupSnapshots)
    })

    // Should be sorted by date
    expect(result.current.snapshots[0]).toEqual(mockSnapshot1)
    expect(result.current.snapshots[1]).toEqual(mockSnapshot2)
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'instaTrackSnapshots',
      JSON.stringify([mockSnapshot1, mockSnapshot2])
    )
  })

  it('should handle localStorage errors gracefully', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
    localStorage.getItem.mockImplementation(() => {
      throw new Error('localStorage error')
    })

    const { result } = renderHook(() => useSnapshots())

    expect(result.current.snapshots).toEqual([])
    expect(result.current.isLoaded).toBe(true)
    expect(consoleErrorSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })

  it('should handle invalid JSON in localStorage', () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()
    localStorage.getItem.mockReturnValue('invalid json')

    const { result } = renderHook(() => useSnapshots())

    expect(result.current.snapshots).toEqual([])
    expect(result.current.isLoaded).toBe(true)
    expect(consoleErrorSpy).toHaveBeenCalled()

    consoleErrorSpy.mockRestore()
  })
})