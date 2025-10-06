import { render, screen } from '@testing-library/react'
import UserTable from '../user-table'
import type { User } from '@/lib/types'

const mockUsers: User[] = [
  { username: 'user1', profileUrl: 'https://instagram.com/user1' },
  { username: 'user2', profileUrl: 'https://instagram.com/user2' },
  { username: 'user3', profileUrl: 'https://instagram.com/user3' }
]

describe('UserTable component', () => {
  it('should render table with users', () => {
    render(<UserTable title="Test Users" users={mockUsers} />)

    expect(screen.getByText('Test Users')).toBeInTheDocument()
    expect(screen.getByText('user1')).toBeInTheDocument()
    expect(screen.getByText('user2')).toBeInTheDocument()
    expect(screen.getByText('user3')).toBeInTheDocument()
  })

  it('should render user count', () => {
    render(<UserTable title="Test Users" users={mockUsers} />)

    expect(screen.getByText('3 users')).toBeInTheDocument()
  })

  it('should render empty state when no users', () => {
    render(<UserTable title="Test Users" users={[]} />)

    expect(screen.getByText('No users found')).toBeInTheDocument()
    expect(screen.getByText('0 users')).toBeInTheDocument()
  })

  it('should render profile links correctly', () => {
    render(<UserTable title="Test Users" users={mockUsers} />)

    const profileLinks = screen.getAllByRole('link')
    expect(profileLinks).toHaveLength(3)
    expect(profileLinks[0]).toHaveAttribute('href', 'https://instagram.com/user1')
    expect(profileLinks[1]).toHaveAttribute('href', 'https://instagram.com/user2')
    expect(profileLinks[2]).toHaveAttribute('href', 'https://instagram.com/user3')
  })

  it('should open links in new tab', () => {
    render(<UserTable title="Test Users" users={mockUsers} />)

    const profileLinks = screen.getAllByRole('link')
    profileLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  it('should handle single user correctly', () => {
    const singleUser = [mockUsers[0]]
    render(<UserTable title="Test Users" users={singleUser} />)

    expect(screen.getByText('1 user')).toBeInTheDocument()
    expect(screen.getByText('user1')).toBeInTheDocument()
  })

  it('should filter out users with undefined username', () => {
    const usersWithUndefined: User[] = [
      { username: 'user1', profileUrl: 'https://instagram.com/user1' },
      { username: undefined as any, profileUrl: 'https://instagram.com/user2' },
      { username: 'user3', profileUrl: 'https://instagram.com/user3' }
    ]

    render(<UserTable title="Test Users" users={usersWithUndefined} />)

    // Should only show valid users
    expect(screen.getByText('user1')).toBeInTheDocument()
    expect(screen.getByText('user3')).toBeInTheDocument()
    expect(screen.queryByText('undefined')).not.toBeInTheDocument()
  })
})