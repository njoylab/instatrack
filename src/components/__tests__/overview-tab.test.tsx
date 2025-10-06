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

// Mock Chart components
jest.mock('@/components/ui/chart', () => ({
  ChartContainer: ({ children }: any) => <div data-testid="chart-container">{children}</div>,
  ChartTooltip: () => <div data-testid="chart-tooltip" />,
  ChartTooltipContent: () => <div data-testid="chart-tooltip-content" />,
  ChartLegend: () => <div data-testid="chart-legend" />,
  ChartLegendContent: () => <div data-testid="chart-legend-content" />
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
    const followerCard = screen.getByText('Total Followers').closest('div.rounded-lg')
    const followingCard = screen.getByText('Total Following').closest('div.rounded-lg')

    expect(followerCard).toHaveTextContent('3') // Latest followers count
    expect(followingCard).toHaveTextContent('2') // Latest following count
  })

  it('should render growth indicators', () => {
    render(<OverviewTab snapshots={mockSnapshots} />)

    // Should show growth from previous snapshot
    const followerCard = screen.getByText('Total Followers').closest('div.rounded-lg')
    const followingCard = screen.getByText('Total Following').closest('div.rounded-lg')

    expect(followerCard).toHaveTextContent('1from last snapshot') // Followers growth
    expect(followingCard).toHaveTextContent('1from last snapshot') // Following growth
  })

  it('should render chart when multiple snapshots exist', () => {
    render(<OverviewTab snapshots={mockSnapshots} />)

    expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
  })

  it('should handle single snapshot', () => {
    const singleSnapshot = [mockSnapshots[0]]
    render(<OverviewTab snapshots={singleSnapshot} />)

    const followerCard = screen.getByText('Total Followers').closest('div.rounded-lg')
    const followingCard = screen.getByText('Total Following').closest('div.rounded-lg')

    expect(followerCard).toHaveTextContent('2') // Followers count
    expect(followingCard).toHaveTextContent('1') // Following count
  })

  it('should handle empty snapshots array', () => {
    const { container } = render(<OverviewTab snapshots={[]} />)

    // Should return null and not crash
    expect(container.firstChild).toBeNull()
  })

  it('should display correct section titles', () => {
    render(<OverviewTab snapshots={mockSnapshots} />)

    expect(screen.getByText('Follower & Following Trends')).toBeInTheDocument()
  })

  it('should show followers and following labels', () => {
    render(<OverviewTab snapshots={mockSnapshots} />)

    expect(screen.getByText('Total Followers')).toBeInTheDocument()
    expect(screen.getByText('Total Following')).toBeInTheDocument()
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

    const followerCard = screen.getByText('Total Followers').closest('div.rounded-lg')
    const followingCard = screen.getByText('Total Following').closest('div.rounded-lg')

    expect(followerCard).toHaveTextContent('2from last snapshot') // Followers decline (shows absolute value)
    expect(followingCard).toHaveTextContent('1from last snapshot') // Following decline (shows absolute value)
  })
})