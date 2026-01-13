import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ImportDialog from '../import-dialog'
import type { Snapshot } from '@/lib/types'

// Mock the toast hook
const mockToast = jest.fn()
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: mockToast
  })
}))

// Mock the useSnapshots hook
const mockSnapshots: any[] = []
jest.mock('@/hooks/use-snapshots', () => ({
  useSnapshots: () => ({
    snapshots: mockSnapshots,
    addSnapshot: jest.fn(),
    clearSnapshots: jest.fn(),
    isLoaded: true,
    restoreSnapshots: jest.fn()
  })
}))

// Mock Radix UI Dialog components
jest.mock('@radix-ui/react-dialog', () => ({
  Root: ({ children, open }: any) => open ? <div>{children}</div> : null,
  Portal: ({ children }: any) => <div>{children}</div>,
  Overlay: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Content: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Title: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Description: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  Close: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  Trigger: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}))

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Loader2: () => <div data-testid="loader-icon" />,
  UploadCloud: () => <div data-testid="upload-icon" />,
  Info: () => <div data-testid="info-icon" />,
  X: () => <div data-testid="x-icon" />,
}))

const mockOnSave = jest.fn()
const mockOnOpenChange = jest.fn()

const defaultProps = {
  isOpen: true,
  onOpenChange: mockOnOpenChange,
  onSave: mockOnSave
}

describe('ImportDialog component', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockSnapshots.length = 0
    mockToast.mockClear()
  })

  it('should render dialog when open', () => {
    render(<ImportDialog {...defaultProps} />)

    expect(screen.getByText('Create New Snapshot')).toBeInTheDocument()
    expect(screen.getByText(/Upload your.*followers_1.json.*and.*following.json/)).toBeInTheDocument()
  })

  it('should not render dialog when closed', () => {
    render(<ImportDialog {...defaultProps} isOpen={false} />)

    expect(screen.queryByText('Create New Snapshot')).not.toBeInTheDocument()
  })

  it('should show file inputs', () => {
    render(<ImportDialog {...defaultProps} />)

    expect(screen.getByLabelText(/Followers File/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Following File/)).toBeInTheDocument()
  })

  it('should disable create button when no files selected', () => {
    render(<ImportDialog {...defaultProps} />)

    const createButton = screen.getByText('Create Snapshot')
    expect(createButton).toBeDisabled()
  })

  it('should enable create button when both files selected', async () => {
    const user = userEvent.setup()
    render(<ImportDialog {...defaultProps} />)

    // Create mock files
    const followersFile = new File(['[]'], 'followers.json', { type: 'application/json' })
    const followingFile = new File(['[]'], 'following.json', { type: 'application/json' })

    const followersInput = screen.getByLabelText(/Followers File/)
    const followingInput = screen.getByLabelText(/Following File/)

    await user.upload(followersInput, followersFile)
    await user.upload(followingInput, followingFile)

    const createButton = screen.getByText('Create Snapshot')
    expect(createButton).not.toBeDisabled()
  })

  it('should show selected file names', async () => {
    const user = userEvent.setup()
    render(<ImportDialog {...defaultProps} />)

    const followersFile = new File(['[]'], 'followers.json', { type: 'application/json' })
    const followingFile = new File(['[]'], 'following.json', { type: 'application/json' })

    const followersInput = screen.getByLabelText(/Followers File/)
    const followingInput = screen.getByLabelText(/Following File/)

    await user.upload(followersInput, followersFile)
    await user.upload(followingInput, followingFile)

    expect(screen.getByText('Selected: followers.json')).toBeInTheDocument()
    expect(screen.getByText('Selected: following.json')).toBeInTheDocument()
  })

  it('should call onOpenChange when cancel button clicked', async () => {
    const user = userEvent.setup()
    render(<ImportDialog {...defaultProps} />)

    const cancelButton = screen.getByText('Cancel')
    await user.click(cancelButton)

    expect(mockOnOpenChange).toHaveBeenCalledWith(false)
  })

  it('should show help link', () => {
    render(<ImportDialog {...defaultProps} />)

    const helpLink = screen.getByText('this guide')
    expect(helpLink).toHaveAttribute('href', '/how-to-export')
    expect(helpLink).toHaveAttribute('target', '_blank')
  })

  it('should handle successful file processing', async () => {
    const user = userEvent.setup()

    // Mock FileReader
    const mockFileReader = {
      readAsText: jest.fn(),
      result: JSON.stringify([{
        string_list_data: [
          { value: 'testuser', href: 'https://instagram.com/testuser' }
        ]
      }]),
      onload: null,
      onerror: null
    }

    global.FileReader = jest.fn(() => mockFileReader) as any

    render(<ImportDialog {...defaultProps} />)

    const followersData = JSON.stringify({
      relationships_followers: [{
        string_list_data: [
          { value: 'follower1', href: 'https://instagram.com/follower1' }
        ]
      }]
    })

    const followingData = JSON.stringify({
      relationships_following: [{
        string_list_data: [
          { value: 'following1', href: 'https://instagram.com/following1' }
        ]
      }]
    })

    const followersFile = new File([followersData], 'followers.json', { type: 'application/json' })
    const followingFile = new File([followingData], 'following.json', { type: 'application/json' })

    const followersInput = screen.getByLabelText(/Followers File/)
    const followingInput = screen.getByLabelText(/Following File/)

    await user.upload(followersInput, followersFile)
    await user.upload(followingInput, followingFile)

    const createButton = screen.getByText('Create Snapshot')

    // Mock FileReader behavior
    mockFileReader.readAsText.mockImplementation(() => {
      if (mockFileReader.onload) {
        mockFileReader.onload({ target: { result: followersData } } as any)
      }
    })

    await user.click(createButton)

    // Wait for async operations
    await waitFor(() => {
      expect(mockFileReader.readAsText).toHaveBeenCalled()
    })
  })

  it('should skip creating snapshot when data is identical to last snapshot', async () => {
    const user = userEvent.setup()

    // Add an existing snapshot with the same data we're about to import
    const existingSnapshot: Snapshot = {
      date: '2024-01-01T00:00:00.000Z',
      followers: [
        { username: 'follower1', profileUrl: 'https://instagram.com/follower1' }
      ],
      following: [
        { username: 'following1', profileUrl: 'https://instagram.com/following1' }
      ]
    }
    mockSnapshots.push(existingSnapshot)

    // Mock FileReader
    const followersData = JSON.stringify({
      relationships_followers: [{
        string_list_data: [
          { value: 'follower1', href: 'https://instagram.com/follower1' }
        ]
      }]
    })

    const followingData = JSON.stringify({
      relationships_following: [{
        string_list_data: [
          { value: 'following1', href: 'https://instagram.com/following1' }
        ]
      }]
    })

    const mockFileReader = {
      readAsText: jest.fn(),
      result: '',
      onload: null as any,
      onerror: null as any
    }

    let readCount = 0
    mockFileReader.readAsText.mockImplementation(() => {
      readCount++
      const result = readCount === 1 ? followersData : followingData
      if (mockFileReader.onload) {
        setTimeout(() => {
          mockFileReader.onload({ target: { result } } as any)
        }, 0)
      }
    })

    global.FileReader = jest.fn(() => mockFileReader) as any

    render(<ImportDialog {...defaultProps} />)

    const followersFile = new File([followersData], 'followers.json', { type: 'application/json' })
    const followingFile = new File([followingData], 'following.json', { type: 'application/json' })

    const followersInput = screen.getByLabelText(/Followers File/)
    const followingInput = screen.getByLabelText(/Following File/)

    await user.upload(followersInput, followersFile)
    await user.upload(followingInput, followingFile)

    const createButton = screen.getByText('Create Snapshot')
    await user.click(createButton)

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'No Changes Detected',
        description: expect.stringContaining('identical to your most recent snapshot')
      })
    })

    expect(mockOnSave).not.toHaveBeenCalled()
    expect(mockOnOpenChange).toHaveBeenCalledWith(false)
  })

  it('should create snapshot when data is different from last snapshot', async () => {
    const user = userEvent.setup()

    // Add an existing snapshot with different data
    const existingSnapshot: Snapshot = {
      date: '2024-01-01T00:00:00.000Z',
      followers: [
        { username: 'olduser', profileUrl: 'https://instagram.com/olduser' }
      ],
      following: [
        { username: 'oldfollow', profileUrl: 'https://instagram.com/oldfollow' }
      ]
    }
    mockSnapshots.push(existingSnapshot)

    // Mock FileReader
    const followersData = JSON.stringify({
      relationships_followers: [{
        string_list_data: [
          { value: 'newfollower', href: 'https://instagram.com/newfollower' }
        ]
      }]
    })

    const followingData = JSON.stringify({
      relationships_following: [{
        string_list_data: [
          { value: 'newfollowing', href: 'https://instagram.com/newfollowing' }
        ]
      }]
    })

    const mockFileReader = {
      readAsText: jest.fn(),
      result: '',
      onload: null as any,
      onerror: null as any
    }

    let readCount = 0
    mockFileReader.readAsText.mockImplementation(() => {
      readCount++
      const result = readCount === 1 ? followersData : followingData
      if (mockFileReader.onload) {
        setTimeout(() => {
          mockFileReader.onload({ target: { result } } as any)
        }, 0)
      }
    })

    global.FileReader = jest.fn(() => mockFileReader) as any

    render(<ImportDialog {...defaultProps} />)

    const followersFile = new File([followersData], 'followers.json', { type: 'application/json' })
    const followingFile = new File([followingData], 'following.json', { type: 'application/json' })

    const followersInput = screen.getByLabelText(/Followers File/)
    const followingInput = screen.getByLabelText(/Following File/)

    await user.upload(followersInput, followersFile)
    await user.upload(followingInput, followingFile)

    const createButton = screen.getByText('Create Snapshot')
    await user.click(createButton)

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: 'Success',
        description: expect.stringContaining('Snapshot created')
      })
    })

    expect(mockOnSave).toHaveBeenCalled()
  })
})