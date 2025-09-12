# Tax Accounting Blog Management System

## Overview

This is a comprehensive blog management system specifically designed for tax accounting firms. The application features a modern React frontend with TypeScript, an Express.js backend, and PostgreSQL database integration. It combines a public-facing blog site with a sophisticated admin dashboard that includes AI-powered content generation capabilities.

The system is built to handle professional tax accounting content with features like category filtering, content scheduling, SEO optimization, and automated content generation. The design follows Medium-inspired clean reading experiences combined with WordPress-style admin functionality, optimized for professional tax content.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with custom design system based on shadcn/ui components
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **Theme System**: Custom light/dark mode implementation with CSS variables

### Component Structure
- **Public Blog Interface**: Clean, Medium-inspired design with article cards, category filtering, and search functionality
- **Admin Dashboard**: WordPress-inspired interface with sidebar navigation, content management, and AI integration panels
- **Shared UI Components**: Comprehensive design system using Radix UI primitives with custom styling

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Storage Interface**: Abstracted storage layer (currently in-memory, designed for PostgreSQL integration)
- **API Design**: RESTful API structure with middleware for logging and error handling

### Database Design
- **Primary Database**: PostgreSQL (configured via Drizzle)
- **Schema Management**: Type-safe schema definitions with Zod validation
- **Migration System**: Drizzle Kit for database migrations and schema changes

### Development Architecture
- **Build System**: Vite for fast development and optimized production builds
- **Development Server**: Hot module replacement with Vite middleware integration
- **TypeScript Configuration**: Strict typing with path aliases for clean imports
- **Code Organization**: Monorepo structure with shared types and utilities

### Design System
- **Color Palette**: Professional blue primary (#2C5AA0) with carefully chosen accent colors
- **Typography**: Noto Sans/Source Sans Pro for professional readability
- **Component Variants**: Systematic approach to button states, card elevations, and interactive elements
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

### Content Management Features
- **Rich Text Editing**: Planned integration for content creation
- **AI Content Generation**: Interface for automated content creation with customizable prompts
- **Category System**: Hierarchical content organization with tags and filtering
- **SEO Optimization**: Built-in meta tag management and content optimization

## External Dependencies

### Core Framework Dependencies
- **React Ecosystem**: React 18, React Router (Wouter), TanStack React Query for data fetching
- **UI Component Library**: Radix UI primitives for accessible, unstyled components
- **Styling**: Tailwind CSS with PostCSS for utility-first styling approach

### Database and Backend
- **Database**: Neon Database (PostgreSQL) via @neondatabase/serverless
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Session Management**: connect-pg-simple for PostgreSQL-backed session storage

### Development and Build Tools
- **Build Tool**: Vite for development server and production builds
- **TypeScript**: Full TypeScript support across frontend and backend
- **Code Quality**: ESBuild for fast compilation and bundling

### Utility Libraries
- **Date Handling**: date-fns for comprehensive date manipulation
- **Class Management**: clsx and tailwind-merge for conditional CSS classes
- **Form Handling**: React Hook Form with Zod resolvers for validation
- **Carousel**: Embla Carousel for content sliders and galleries

### Planned Integrations
- **AI Content Generation**: Interface ready for OpenAI or similar AI service integration
- **Search Functionality**: Architecture prepared for search service integration
- **Analytics**: Dashboard structure ready for analytics service integration
- **Email Services**: Contact forms and notifications system ready for email service integration