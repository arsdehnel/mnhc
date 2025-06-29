# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

MN Hiking Club is a hiking trail tracking application built with RedwoodSDK, running on Cloudflare Workers with React Server Components (RSC). The app uses Prisma with D1 (SQLite) for data persistence and implements WebAuthn for authentication.

## Development Commands

### Core Development
- `pnpm install` - Install dependencies  
- `pnpm dev` - Start development server at http://localhost:5173/
- `pnpm build` - Build for production
- `pnpm release` - Deploy to Cloudflare (requires deploy environment setup)

### Database Operations
- `pnpm run migrate:dev` - Apply migrations locally (generates Prisma client and applies to local D1)
- `pnpm run migrate:prd` - Apply migrations to production D1 database
- `pnpm run migrate:new` - Create new migration
- `pnpm run seed` - Run database seeding script

### Code Quality & Type Checking
- `pnpm run types` - Run TypeScript type checking
- `pnpm run check` - Generate types and run type checking
- `pnpm run generate` - Generate Prisma client and Wrangler types

### Utilities
- `pnpm run worker:run` - Run worker scripts (e.g., for seeding)
- `pnpm run clean` - Clean Vite cache

## Architecture

### Technology Stack
- **Framework**: RedwoodSDK with React Server Components (RSC)
- **Runtime**: Cloudflare Workers
- **Database**: Prisma with D1 (SQLite) adapter
- **Auth**: WebAuthn with durable objects for session management
- **Build Tool**: Vite with Cloudflare plugin

### Project Structure
- `src/app/` - React components and pages
  - `pages/` - Route components (Home, Trails, Log, Maps, user auth)
  - `layouts/` - Layout components (standard.tsx provides main nav)
  - `shared/` - Shared utilities and links
  - `styles/` - Global CSS
- `src/session/` - Session management with durable objects
- `src/scripts/` - Utility scripts (seeding, etc.)
- `prisma/` - Database schema and migrations
- `generated/prisma/` - Auto-generated Prisma client (do not edit)
- `migrations/` - Database migration SQL files

### Key Components
- **Worker Entry**: `src/worker.tsx` - Main application entry point with routing and middleware
- **Client Entry**: `src/client.tsx` - Client-side initialization
- **Database**: `src/db.ts` - Database connection and setup
- **Document**: `src/app/Document.tsx` - HTML document wrapper

### Data Models
- **User**: Basic user model with WebAuthn credentials
- **Credential**: WebAuthn credential storage linked to users
- **Trail**: Hiking trail information (name, address, difficulty, media URLs, notes)

## React Server Components (RSC) Guidelines

### Server Components (Default)
- All components are server components by default
- Can directly access database and perform async operations
- Cannot use client-side interactivity (state, effects, event handlers)
- Pass `ctx` (AppContext) through props for user/session data

### Client Components
- Must start with `"use client"` directive
- Required for interactivity, browser APIs, event handlers
- Should be kept minimal to reduce bundle size

### Server Functions  
- Must start with `"use server"` directive
- Execute on server when called from client components
- Access request context via `import { requestInfo } from "rwsdk/worker"`

## Authentication & Sessions
- Uses WebAuthn for passwordless authentication
- Sessions managed via Cloudflare Durable Objects
- Session data includes user ID and is automatically validated
- Protected routes redirect to `/user/login` if unauthenticated

## Database Development
- Prisma generates TypeScript client to `generated/prisma/`
- Always run `pnpm run generate` after schema changes
- Use `pnpm run migrate:new` to create migrations
- Local development uses `--local` flag for D1 operations

## Deployment
- Deploys to Cloudflare Workers via `pnpm run release`
- Requires proper environment variables and wrangler configuration
- Uses D1 database binding named "DB"
- Durable Objects handle session persistence