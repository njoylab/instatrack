import type { User, Snapshot } from '../types'

describe('types', () => {
  describe('User type', () => {
    it('should have correct structure', () => {
      const user: User = {
        username: 'testuser',
        profileUrl: 'https://instagram.com/testuser'
      }

      expect(user).toHaveProperty('username')
      expect(user).toHaveProperty('profileUrl')
      expect(typeof user.username).toBe('string')
      expect(typeof user.profileUrl).toBe('string')
    })
  })

  describe('Snapshot type', () => {
    it('should have correct structure', () => {
      const snapshot: Snapshot = {
        date: '2024-01-01T00:00:00.000Z',
        followers: [
          { username: 'follower1', profileUrl: 'https://instagram.com/follower1' }
        ],
        following: [
          { username: 'following1', profileUrl: 'https://instagram.com/following1' }
        ]
      }

      expect(snapshot).toHaveProperty('date')
      expect(snapshot).toHaveProperty('followers')
      expect(snapshot).toHaveProperty('following')
      expect(typeof snapshot.date).toBe('string')
      expect(Array.isArray(snapshot.followers)).toBe(true)
      expect(Array.isArray(snapshot.following)).toBe(true)
    })

    it('should allow empty arrays for followers and following', () => {
      const snapshot: Snapshot = {
        date: '2024-01-01T00:00:00.000Z',
        followers: [],
        following: []
      }

      expect(snapshot.followers).toHaveLength(0)
      expect(snapshot.following).toHaveLength(0)
    })
  })
})