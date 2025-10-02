# 📊 InstaTrack

A privacy-focused Instagram analytics tool built with Next.js that helps you track your followers and following over time. All data processing happens locally in your browser - no data is ever sent to external servers.

![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-blue?logo=tailwindcss)
![React](https://img.shields.io/badge/React-18.3-blue?logo=react)

## ✨ Features

- **🔒 Privacy First**: All data processing happens locally in your browser
- **📈 Trend Analysis**: Track follower/following growth over time with interactive charts
- **🔍 Smart Analysis**: Insights to identify non-reciprocal relationships
- **📊 Visual Dashboard**: Clean, responsive interface with real-time stats
- **💾 Data Management**: Backup and restore your data anytime
- **📱 Mobile Friendly**: Fully responsive design for all devices

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd instatrack
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:9002](http://localhost:9002)

## 📖 How to Use

### 1. Export Your Instagram Data

1. Go to [Instagram's data download page](https://accountscenter.instagram.com/info_and_permissions/dyi/)
2. Select **"Request a download"**
3. Choose **"Select types of information"**
4. Select **"Followers and following"**
5. Set format to **JSON** and date range to **"All time"**
6. Download and extract the files

### 2. Import Your Data

1. Click **"New Snapshot"** in the app
2. Upload your `followers_1.json` and `following.json` files
3. Your snapshot will be created and stored locally

### 3. Analyze Your Data

- **Overview**: See your current stats and growth trends
- **Analysis**: Discover who doesn't follow you back and vice versa
- **Changes**: Track what changed between snapshots

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev                 # Start dev server (port 9002)
npm run build              # Build for production
npm run start              # Start production server

# Code Quality
npm run lint               # Run ESLint
npm run typecheck          # Run TypeScript type checking

# Testing
npm test                   # Run tests
npm run test:watch         # Run tests in watch mode
npm run test:coverage      # Run tests with coverage
```

### Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **Charts**: Recharts
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library

### Project Structure

```
src/
├── app/                   # Next.js app router pages
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── __tests__/        # Component tests
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and types
└── __tests__/           # Test files
```

### Key Components

- `dashboard-client.tsx` - Main dashboard with tabs
- `import-dialog.tsx` - File import functionality
- `overview-tab.tsx` - Stats and charts display
- `analysis-tab.tsx` - Analysis and insights
- `changes-tab.tsx` - Change tracking between snapshots
- `use-snapshots.ts` - Data management hook

## 🧪 Testing

The project includes comprehensive tests for:

- **Utility functions** - Core logic and helpers
- **Custom hooks** - Data management and mobile detection
- **Components** - UI components and user interactions
- **Types** - TypeScript type definitions

Run tests with:
```bash
npm test                   # All tests
npm run test:coverage      # With coverage report
```

## 🔧 Configuration

### Environment Setup

The app runs client-side and doesn't require environment variables for basic functionality.

### Customization

- **Styling**: Modify `tailwind.config.ts` and component styles
- **Data Structure**: Extend types in `src/lib/types.ts`

## 📊 Data Privacy

- **Local Processing**: All data stays in your browser's localStorage
- **No External Servers**: No data is transmitted to external services
- **Export/Import**: Full control over your data with backup/restore
- **Open Source**: Transparent codebase you can audit

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style (ESLint + Prettier)
- Write tests for new features
- Update documentation as needed
- Ensure TypeScript compliance

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

If you encounter any issues or have questions:

1. Check the [FAQ page](./src/app/faq/page.tsx) in the app
2. Search existing [GitHub issues](../../issues)
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Recharts](https://recharts.org/) - Data visualization

---

Made with ❤️ for Instagram users who want to understand their social connections better.