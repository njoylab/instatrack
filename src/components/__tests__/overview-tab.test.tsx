import { render, screen } from '@testing-library/react'
import OverviewTab from '../overview-tab'
import type { Snapshot } from '@/lib/types'

// Mock Recharts
jest.mock('recharts', () => ({
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>
}))

const mockSnapshots: Snapshot[] = [
  {
    date: '2024-01-01T00:00:00.000Z',
    followers: [
      { username: 'follower1', profileUrl: 'https://instagram.com/follower1' },
      { username: 'follower2', profileUrl: 'https://instagram.com/follower2' }
    ],
    following: [
      { username: 'following1', profileUrl: 'https://instagram.com/following1' }
    ]
  },
  {
    date: '2024-01-02T00:00:00.000Z',
    followers: [
      { username: 'follower1', profileUrl: 'https://instagram.com/follower1' },
      { username: 'follower2', profileUrl: 'https://instagram.com/follower2' },
      { username: 'follower3', profileUrl: 'https://instagram.com/follower3' }
    ],
    following: [
      { username: 'following1', profileUrl: 'https://instagram.com/following1' },
      { username: 'following2', profileUrl: 'https://instagram.com/following2' }
    ]
  }
]

describe('OverviewTab component', () => {
  it('should render latest snapshot stats', () => {
    render(<OverviewTab snapshots={mockSnapshots} />)

    // Should show latest snapshot data (second snapshot)
    expect(screen.getByText('3')).toBeInTheDocument() // Latest followers count
    expect(screen.getByText('2')).toBeInTheDocument() // Latest following count
  })

  it('should render growth indicators', () => {
    render(<OverviewTab snapshots={mockSnapshots} />)

    // Should show growth from previous snapshot
    expect(screen.getByText('+1')).toBeInTheDocument() // Followers growth
    expect(screen.getByText('+1')).toBeInTheDocument() // Following growth
  })

  it('should render chart when multiple snapshots exist', () => {
    render(<OverviewTab snapshots={mockSnapshots} />)

    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
  })

  it('should handle single snapshot', () => {
    const singleSnapshot = [mockSnapshots[0]]
    render(<OverviewTab snapshots={singleSnapshot} />)

    expect(screen.getByText('2')).toBeInTheDocument() // Followers count
    expect(screen.getByText('1')).toBeInTheDocument() // Following count
  })

  it('should handle empty snapshots array', () => {
    render(<OverviewTab snapshots={[]} />)

    // Should render without crashing
    expect(screen.getByText('Follower & Following Trends')).toBeInTheDocument()
  })

  it('should display correct section titles', () => {
    render(<OverviewTab snapshots={mockSnapshots} />)

    expect(screen.getByText('Current Stats')).toBeInTheDocument()
    expect(screen.getByText('Follower & Following Trends')).toBeInTheDocument()
  })

  it('should show followers and following labels', () => {
    render(<OverviewTab snapshots={mockSnapshots} />)

    expect(screen.getByText('Followers')).toBeInTheDocument()
    expect(screen.getByText('Following')).toBeInTheDocument()
  })

  it('should handle negative growth', () => {
    const decliningSnapshots: Snapshot[] = [
      {
        date: '2024-01-01T00:00:00.000Z',
        followers: [
          { username: 'follower1', profileUrl: 'https://instagram.com/follower1' },
          { username: 'follower2', profileUrl: 'https://instagram.com/follower2' },
          { username: 'follower3', profileUrl: 'https://instagram.com/follower3' }
        ],
        following: [
          { username: 'following1', profileUrl: 'https://instagram.com/following1' },
          { username: 'following2', profileUrl: 'https://instagram.com/following2' }
        ]
      },
      {
        date: '2024-01-02T00:00:00.000Z',
        followers: [
          { username: 'follower1', profileUrl: 'https://instagram.com/follower1' }
        ],
        following: [
          { username: 'following1', profileUrl: 'https://instagram.com/following1' }
        ]
      }
    ]

    render(<OverviewTab snapshots={decliningSnapshots} />)

    expect(screen.getByText('-2')).toBeInTheDocument() // Followers decline
    expect(screen.getByText('-1')).toBeInTheDocument() // Following decline
  })
})