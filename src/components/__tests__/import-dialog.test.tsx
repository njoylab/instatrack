import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ImportDialog from '../import-dialog'
import type { Snapshot } from '@/lib/types'

// Mock the toast hook
jest.mock('@/hooks/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn()
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
})