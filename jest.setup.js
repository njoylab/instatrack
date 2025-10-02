import '@testing-library/jest-dom'

// Mock window.localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock URL.createObjectURL
Object.defineProperty(URL, 'createObjectURL', {
  value: jest.fn(() => 'mocked-url'),
})

Object.defineProperty(URL, 'revokeObjectURL', {
  value: jest.fn(),
})

// Mock FileReader
global.FileReader = class {
  readAsText = jest.fn()
  onload = null
  onerror = null
  result = null
}

// Mock lucide-react icons
jest.mock('lucide-react', () => ({
  Upload: () => <div data-testid="upload-icon" />,
  Trash2: () => <div data-testid="trash-icon" />,
  LineChart: () => <div data-testid="linechart-icon" />,
  UsersRound: () => <div data-testid="users-round-icon" />,
  HeartOff: () => <div data-testid="heart-off-icon" />,
  Users: () => <div data-testid="users-icon" />,
  Save: () => <div data-testid="save-icon" />,
  RotateCcw: () => <div data-testid="rotate-icon" />,
  ArrowLeft: () => <div data-testid="arrow-left-icon" />,
  ArrowDown: () => <div data-testid="arrow-down-icon" />,
  ArrowUp: () => <div data-testid="arrow-up-icon" />,
  ArrowUpDown: () => <div data-testid="arrow-up-down-icon" />,
  UserPlus: () => <div data-testid="user-plus-icon" />,
  Loader2: () => <div data-testid="loader-icon" />,
  UploadCloud: () => <div data-testid="upload-cloud-icon" />,
  Info: () => <div data-testid="info-icon" />,
  CalendarDays: () => <div data-testid="calendar-icon" />,
  Search: () => <div data-testid="search-icon" />,
  SortAsc: () => <div data-testid="sort-asc-icon" />,
  SortDesc: () => <div data-testid="sort-desc-icon" />,
  ExternalLink: () => <div data-testid="external-link-icon" />,
  TrendingUp: () => <div data-testid="trending-up-icon" />,
  TrendingDown: () => <div data-testid="trending-down-icon" />
}))

// Reset mocks before each test
beforeEach(() => {
  localStorageMock.getItem.mockClear()
  localStorageMock.setItem.mockClear()
  localStorageMock.removeItem.mockClear()
  localStorageMock.clear.mockClear()
})