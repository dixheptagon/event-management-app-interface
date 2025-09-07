# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

**Ticketin** is an event management application built with Next.js 15, TypeScript, and TailwindCSS. It allows users to create events, manage tickets, and handle event attendees. The frontend is designed as the interface for a full-stack event management platform.

## Development Commands

```bash
# Development
npm run dev          # Start development server on localhost:3000

# Building and Production
npm run build        # Build production version
npm start           # Start production server
npm run lint        # Run ESLint for code quality checks

# Git Hooks (Husky)
npm run prepare     # Install git hooks (runs automatically after npm install)
```

## Architecture Overview

### Directory Structure
The project follows Next.js 15 App Router conventions with a feature-based organization:

- **`src/app/`** - App Router pages with route groups:
  - `(auth)/` - Authentication pages (login, register, verification)
  - `(dashboard)/` - User dashboard pages  
  - `(event)/` - Event management pages (create, explore, details)
  - `(root)/` - Landing page and general pages

### Page Organization Pattern
Each feature page follows a consistent structure:
```
feature-page/
├── _components/     # Feature-specific components
├── _hooks/         # Custom hooks for the feature
├── _schemas/       # Validation schemas (Yup)
├── _types/         # TypeScript type definitions
├── _constants/     # Feature constants
└── page.tsx        # Main page component
```

### Global Architecture

- **State Management**: Zustand stores in `src/stores/`
  - `auth.store.ts` - Authentication state with persistence
  - `explore.events.store.ts` - Events filtering and pagination state

- **API Integration**: 
  - Centralized Axios instance in `src/utils/axios.instance.ts`
  - Base URL configured via `NEXT_PUBLIC_API_URL` environment variable

- **Authentication**: 
  - Provider pattern with `AuthProvider` wrapping the app
  - Session-based authentication with automatic token validation
  - Zustand store with persistence for auth state

- **UI Components**: 
  - Shadcn/ui components in `src/components/ui/`
  - Shared components in `src/components/shared/`
  - Tailwind CSS with custom component styling

### Form Handling Pattern
The project uses a consistent form pattern:
- **Formik** for form state and submission
- **Yup** schemas for validation (in `_schemas/` directories)
- **TypeScript interfaces** in `_types/` directories
- **React Toastify** for user feedback

### Code Style and Conventions

- **File Naming**: camelCase for multi-word files (e.g., `login.form.tsx`)
- **Component Structure**: Private components prefixed with underscore directories (`_components/`)
- **Import Aliases**: `@/` mapped to `src/` directory
- **Prettier**: Configured with Tailwind CSS plugin for class sorting

### Git Workflow

**Branch Structure**:
- `main` - Production branch (protected)
- `develop/*` - Integration branch
- `feat/*` - New features (branch from develop)
- `bugfix/*` - Bug fixes (branch from develop)
- `hotfix/*` - Critical production fixes (branch from main)

**Commit Convention**: Uses Conventional Commits with Commitlint
- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code formatting changes
- `refactor:` - Code refactoring
- `test:` - Test additions/modifications
- `chore:` - Build process or auxiliary tool changes

### Key Dependencies

- **Next.js 15** with App Router and React 19
- **TypeScript 5** for type safety
- **Tailwind CSS 4** for styling
- **Shadcn/ui** component library
- **Formik + Yup** for form handling and validation
- **Zustand** for state management
- **Axios** for API calls
- **React Toastify** for notifications
- **Lucide React** for icons

### Testing and Quality

- **ESLint** with Next.js and TypeScript configurations
- **Prettier** with Tailwind CSS plugin
- **Husky** for git hooks
- **Commitlint** for commit message validation

### Environment Variables

Key environment variables to configure:
- `NEXT_PUBLIC_API_URL` - Backend API base URL
- `NEXT_PUBLIC_BASE_URL` - Frontend base URL for metadata

## Development Notes

- Authentication state persists only the token; other user data is fetched on session validation
- The app uses route groups for logical page organization without affecting URL structure  
- All forms follow the same pattern: Formik + Yup validation + TypeScript types
- API responses use a consistent error handling pattern with toast notifications
- Mobile responsiveness is handled through Tailwind breakpoints and a custom `useIsMobile` hook
