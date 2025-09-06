# 🎟️ Ticketin - Event Ticketing Management System

<div align="center">
  <img src="public/logo.png" alt="Ticketin Logo" width="120">
  <h3>Simplify your event management with Ticketin</h3>
  <p>Create events, sell tickets, and track attendees all in one platform.</p>
</div>

---

## 📋 Table of Contents

- [🎯 Project Overview](#-project-overview)
- [✨ Key Features](#-key-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🚀 Getting Started](#-getting-started)
- [📱 Application Features](#-application-features)
- [🎨 UI/UX Highlights](#-uiux-highlights)
- [📂 Project Structure](#-project-structure)
- [🔐 Authentication & Security](#-authentication--security)
- [🌐 API Integration](#-api-integration)
- [📊 State Management](#-state-management)
- [🎨 Styling & Components](#-styling--components)
- [🔄 Git Workflow](#-git-workflow)
- [📄 Environment Variables](#-environment-variables)
- [🚀 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📞 Support](#-support)

---

## 🎯 Project Overview

**Ticketin** is a comprehensive event ticketing management system built with modern web technologies. This frontend application provides an intuitive interface for event organizers to create and manage events, while offering attendees a seamless ticket purchasing experience.

### 🎪 What Makes Ticketin Special?

- **Modern Architecture**: Built with Next.js 15 and React 19 for optimal performance
- **Type Safety**: Full TypeScript implementation for robust development
- **Responsive Design**: Mobile-first approach ensuring great UX across all devices
- **Real-time Features**: Dynamic event updates and instant notifications
- **Role-based Access**: Different interfaces for attendees and event organizers
- **SEO Optimized**: Dynamic metadata for better search engine visibility

---

## ✨ Key Features

### 👥 For Event Attendees
- **🔍 Event Discovery**: Browse and search events with advanced filtering
- **🎫 Ticket Purchase**: Secure ticket booking with multiple ticket types
- **📱 Mobile Experience**: Fully responsive design for on-the-go access
- **💬 Social Sharing**: Share events across social media platforms
- **🎯 Personalized Dashboard**: View purchased tickets and event history
- **🔔 Notifications**: Real-time updates on event changes and confirmations

### 🎪 For Event Organizers
- **📝 Event Creation**: Comprehensive event setup with rich media support
- **🎫 Ticket Management**: Create multiple ticket types (Free/Paid) with custom pricing
- **📊 Analytics Dashboard**: Track event performance and attendee metrics
- **🎨 Customization**: Add event images, descriptions, and promotional content
- **💰 Promotion Tools**: Create discount codes and special offers
- **📍 Venue Management**: Set event locations with detailed venue information

### 🔐 Authentication Features
- **🔑 Secure Login/Register**: JWT-based authentication system
- **📧 Email Verification**: Two-step verification for account security
- **👤 Role Management**: Attendee and Event Organizer role separation
- **🎁 Referral System**: Welcome bonuses for new users with referral codes
- **🔄 Session Management**: Automatic token refresh and secure logout

---

## 🛠️ Technology Stack

### Frontend Core
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Static type checking for enhanced development
- **Tailwind CSS 4** - Utility-first CSS framework

### UI Components & Design
- **Shadcn/ui** - Modern, accessible component library
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful icon library
- **Framer Motion** - Smooth animations and transitions
- **React Share** - Social media sharing components

### Forms & Validation
- **Formik** - Build forms with validation and error handling
- **Yup** - Schema validation library
- **React Toastify** - Elegant notification system

### State Management
- **Zustand** - Lightweight state management
- **Axios** - HTTP client for API requests
- **React Query** (planned) - Server state management

### Development Tools
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatter with Tailwind CSS plugin
- **Husky** - Git hooks for pre-commit validation
- **Commitlint** - Conventional commit message enforcement

---

## 🚀 Getting Started

### Prerequisites

Before running this project, make sure you have:

- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- A backend API server (refer to backend repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-management-app-interface
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000` to see the application.

### Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Install git hooks
npm run prepare
```

---

## 📱 Application Features

### 🏠 Landing Page
- Hero section with call-to-action
- Featured events carousel with navigation
- Event search functionality
- Responsive navigation with mobile menu

### 🔍 Event Discovery
- **Advanced Search**: Filter by location, category, date range
- **Pagination**: Efficient browsing with customizable items per page
- **Real-time Filtering**: Instant results with URL-based state management
- **Event Cards**: Rich preview with images, pricing, and organizer info

### 📄 Event Details
- **Rich Media Display**: High-quality event images and descriptions
- **Ticket Information**: Multiple ticket types with pricing details
- **Social Sharing**: Facebook, Twitter, WhatsApp integration
- **Responsive Tabs**: Description, tickets, and privacy policy
- **Booking Interface**: Direct ticket purchase functionality

### 🎫 Event Creation (Organizers)
- **Step-by-step Form**: Guided event creation process
- **Image Upload**: Drag-and-drop image handling
- **Ticket Types**: Create multiple ticket categories (Free/Paid)
- **Promotion System**: Add discount codes and special offers
- **Tags & Categories**: Organize events for better discoverability
- **Draft Functionality**: Save work in progress

### 👤 User Dashboard
- **My Tickets**: View purchased tickets and event history
- **Account Management**: Update profile and preferences
- **Settings**: Customize notification and privacy settings
- **Event Management**: (Organizers) Manage created events

---

## 🎨 UI/UX Highlights

### 🎯 Design Principles
- **Mobile-First**: Optimized for mobile devices with responsive scaling
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Performance**: Lazy loading, image optimization, efficient re-renders
- **Consistency**: Uniform design language across all components

### 🎪 Interactive Elements
- **Smooth Animations**: Framer Motion powered transitions
- **Loading States**: Skeleton loaders for better perceived performance
- **Error Handling**: User-friendly error messages and fallbacks
- **Toast Notifications**: Non-intrusive success and error feedback

### 📱 Responsive Breakpoints
- **Mobile**: < 768px (Primary focus)
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
- **Large Desktop**: > 1280px

---

## 📂 Project Structure

```
src/
├── app/                          # Next.js 15 App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── login/
│   │   ├── register/
│   │   └── verification-success/
│   ├── (dashboard)/              # User dashboard
│   │   └── dashboard/
│   │       ├── my-account/
│   │       ├── my-tickets/
│   │       └── settings/
│   ├── (event)/                  # Event-related pages
│   │   ├── create-event/
│   │   ├── event-details/[title]/
│   │   └── explore-events/
│   ├── (root)/                   # Landing and general pages
│   ├── globals.css               # Global styles
│   └── layout.tsx                # Root layout component
├── components/
│   ├── ui/                       # Shadcn/ui components
│   └── shared/                   # Reusable components
│       ├── landing-page/
│       └── navbar/
├── lib/
│   └── utils.ts                  # Utility functions
├── providers/
│   └── auth.provider.tsx         # Authentication context
├── stores/
│   ├── auth.store.ts             # Authentication state
│   └── explore.events.store.ts   # Events filtering state
├── utils/
│   ├── axios.instance.ts         # API client configuration
│   ├── format.date.range.ts      # Date formatting utilities
│   ├── format.price.idr.ts       # Price formatting utilities
│   └── debounce.ts               # Performance utilities
└── hooks/
    └── use-mobile.ts             # Custom hooks
```

### 🗂️ Feature Organization Pattern

Each feature follows a consistent structure:
```
feature-page/
├── _components/     # Feature-specific components
├── _hooks/         # Custom hooks for the feature
├── _schemas/       # Validation schemas (Yup)
├── _types/         # TypeScript type definitions
├── _constants/     # Feature constants
└── page.tsx        # Main page component
```

---

## 🔐 Authentication & Security

### 🔑 Authentication Flow
1. **Registration**: Email verification required
2. **Login**: JWT token-based authentication
3. **Session Management**: Automatic token refresh
4. **Logout**: Secure token invalidation

### 👤 User Roles
- **Attendee**: Can browse and purchase tickets
- **Event Organizer**: Can create and manage events
- **Admin**: Full system access (planned)

### 🛡️ Security Features
- JWT token storage in secure HTTP-only cookies (planned)
- Input validation and sanitization
- XSS and CSRF protection
- Rate limiting on API endpoints

---

## 🌐 API Integration

### 🔌 API Client Configuration
```typescript
// utils/axios.instance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default axiosInstance;
```

### 📡 Key API Endpoints
- **Authentication**: `/api/auth/*` (login, register, verify)
- **Events**: `/api/events/*` (CRUD operations)
- **Tickets**: `/api/tickets/*` (purchase, manage)
- **Users**: `/api/users/*` (profile management)

---

## 📊 State Management

### 🗃️ Zustand Stores

**Authentication Store**
```typescript
interface AuthStore {
  token: string;
  fullname: string;
  role: string;
  setAuth: (data: AuthData) => void;
  clearAuth: () => void;
}
```

**Events Store**
```typescript
interface EventsStore {
  keyword: string;
  filters: EventFilters;
  currentPage: number;
  itemsPerPage: number;
  setFilters: (filters: EventFilters) => void;
}
```

---

## 🎨 Styling & Components

### 🎭 Component Library
- **Shadcn/ui**: Pre-built accessible components
- **Custom Components**: Application-specific UI elements
- **Tailwind CSS**: Utility-first styling approach

### 🎪 Design System
- **Colors**: Consistent color palette with CSS variables
- **Typography**: Responsive text sizing and font weights
- **Spacing**: Standardized margins and padding scale
- **Animations**: Smooth transitions and micro-interactions

---

## 🔄 Git Workflow

### 🌿 Branch Structure
- **`main`**: Production-ready code (protected)
- **`develop/*`**: Integration branch for features
- **`feat/*`**: New feature development
- **`bugfix/*`**: Bug fixes for development
- **`hotfix/*`**: Critical production fixes

### 📝 Commit Convention
We use [Conventional Commits](https://www.conventionalcommits.org/) for consistent commit messages:

```bash
# Format
<type>(scope): description

# Examples
feat(auth): implement JWT authentication
fix(events): resolve ticket booking issue
docs(readme): update installation instructions
style(ui): improve button hover states
refactor(api): optimize event fetching logic
test(auth): add login form validation tests
chore(deps): update dependencies to latest versions
```

### 🔍 Code Quality
- **ESLint**: Enforced code standards
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality checks
- **Commitlint**: Commit message validation

---

## 📄 Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Application Configuration  
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Optional: Add other environment-specific variables
# NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id
# NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

---

## 🚀 Deployment

### 🌐 Production Build
```bash
# Create production build
npm run build

# Start production server
npm start
```

### ☁️ Deployment Options
- **Vercel**: Recommended for Next.js applications
- **Netlify**: Alternative with good Next.js support
- **Railway**: Full-stack deployment platform
- **Docker**: Containerized deployment

### 📋 Pre-deployment Checklist
- [ ] All environment variables configured
- [ ] API endpoints accessible
- [ ] Build completes without errors
- [ ] Performance optimization applied
- [ ] SEO metadata configured

---

## 🤝 Contributing

### 🔧 Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feat/amazing-feature`
3. Make your changes following our coding standards
4. Test your changes thoroughly
5. Commit using conventional commit format
6. Push to your fork and submit a pull request

### 📋 Pull Request Guidelines
- **Clear Title**: Use conventional commit format
- **Detailed Description**: Explain changes and reasoning
- **Screenshots**: Include UI changes visuals
- **Testing**: Ensure all tests pass
- **Documentation**: Update relevant documentation

### 🎯 Code Standards
- Follow existing code patterns and conventions
- Write descriptive component and function names
- Add TypeScript types for all new code
- Include comments for complex logic
- Ensure responsive design compatibility

---

## 📞 Support

### 🆘 Getting Help
- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check WARP.md for development guidelines
- **Code Review**: Ask for feedback during development

### 🐛 Bug Reports
When reporting bugs, please include:
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots or error messages
- Browser and device information
- Environment details

### 💡 Feature Requests
We welcome feature suggestions! Please provide:
- Clear description of the proposed feature
- Use case and benefits
- Potential implementation approach
- Any relevant mockups or examples

---

<div align="center">
  <p><strong>Built with ❤️ for the event management community</strong></p>
  <p>© 2025 Ticketin - Forentino Haryanto</p>
</div>

---

### 📝 Development Notes

- This project uses Next.js 15 App Router for optimal performance
- All forms follow Formik + Yup + TypeScript pattern for consistency
- State management leverages Zustand for simplicity and performance
- Authentication state persists only tokens; user data is fetched on session validation
- The app uses route groups for logical organization without affecting URL structure
- Mobile responsiveness is handled through Tailwind breakpoints and custom hooks
