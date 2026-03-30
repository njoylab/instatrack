# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server (uses Turbopack on port 9002)
- `npm run build` - Build production app
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## AI Development Commands

- `npm run genkit:dev` - Start Genkit AI development server
- `npm run genkit:watch` - Start Genkit with file watching

## Project Architecture

**InstaTrack** is a Next.js 15 application for tracking Instagram followers and following lists over time.

### Core Data Model

- **User**: `{ username: string, profileUrl: string }`
- **Snapshot**: `{ date: string, followers: User[], following: User[] }`
- Data is stored in localStorage with key `instaTrackSnapshots`

### Key Components

- `src/components/dashboard-client.tsx` - Main dashboard with tabs (Overview, Analysis, Changes)
- `src/hooks/use-snapshots.ts` - Custom hook managing snapshot data in localStorage
- `src/lib/types.ts` - TypeScript type definitions
- `src/components/import-dialog.tsx` - Dialog for importing Instagram data
- `src/components/restore-dialog.tsx` - Dialog for restoring backup data

### UI Framework

- **Radix UI** components with custom styling
- **Tailwind CSS** for styling
- **shadcn/ui** component library pattern
- All UI components are in `src/components/ui/`

### AI Integration

- **Google Genkit** integration for AI features
- AI flows in `src/ai/flows/` for analyzing non-reciprocal followers/following
- Configuration in `src/ai/genkit.ts` using Gemini 2.5 Flash model

### Application Flow

1. Users import Instagram follower/following data via JSON files
2. App stores snapshots chronologically in localStorage
3. Dashboard shows overview, AI-powered analysis, and change tracking between snapshots
4. Users can backup data to JSON files and restore from backups

### State Management

- React hooks for component state
- Custom `useSnapshots` hook for persistent data management
- No external state management library (Redux, Zustand, etc.)

### Key Features

- Snapshot comparison and change detection
- AI analysis of follower/following patterns
- Data backup/restore functionality
- Responsive design with mobile support

## Toprank Skills

SEO and content skills installed globally via [toprank](https://github.com/nowork-studio/toprank):

- `/seo-analysis` — Full SEO audit using Google Search Console data + technical crawl. Surfaces quick wins, diagnoses traffic drops, finds content gaps, and produces an actionable 30-day plan.
- `/content-writer` — Writes SEO-optimized blog posts, landing pages, and content improvements following Google's E-E-A-T and Helpful Content guidelines.