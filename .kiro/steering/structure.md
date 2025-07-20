# Project Structure

## Root Directory
- **Configuration files**: TypeScript, Next.js, Tailwind, ESLint, Prettier configs
- **Database**: Drizzle migrations in `/drizzle`, PostgreSQL database
- **Environment**: `.env` for secrets, `.nvmrc` for Node version
- **shadcn/ui**: `components.json` for UI component configuration

## Source Directory (`/src`)

### Application Layer (`/src/app`)
- **App Router structure** with route groups and nested layouts
- **Route groups**: `(auth)` for authentication pages
- **API routes**: `/api` for server endpoints
- **Feature routes**: `/dashboard`, `/kanban`, `/table`, `/projects`
- **Global files**: `layout.tsx`, `globals.css`, `providers.tsx`

### Data Layer
- **`/src/db`**: Database configuration, schema, migrations, and utilities
- **`/src/data-access`**: Data access layer with functions for each entity
- **`/src/use-cases`**: Business logic layer separating concerns from data access

### Server Actions (`/src/actions`)
- Server actions for form handling and mutations
- Type-safe with ZSA (Zod Server Actions)

### Components (`/src/components`)
- **`/src/components/ui`**: Reusable UI components (shadcn/ui pattern)
- **Feature components**: Task dialogs, board components, etc.
- **Shared components**: Loaders, spinners, date pickers

### Utilities & Configuration
- **`/src/lib`**: Utility functions, auth helpers, email setup
- **`/src/types`**: TypeScript type definitions
- **`/src/styles`**: Shared styles and icon components
- **`/src/emails`**: React Email templates
- **`/src/assets`**: Static images and assets

## Architecture Patterns

### Clean Architecture
- **Data Access Layer**: Direct database operations
- **Use Cases Layer**: Business logic and validation
- **Actions Layer**: Server actions for client interactions
- **Components Layer**: UI presentation

### Database Schema Organization
- **User Management**: users, accounts, profiles, sessions
- **Social Features**: groups, memberships, following, posts, replies
- **Communication**: notifications, newsletters, magic links
- **Events**: group events and subscriptions

### File Naming Conventions
- **kebab-case** for component files and directories
- **camelCase** for utility functions and variables
- **PascalCase** for React components and types
- **Database tables**: prefixed with `gf_` (e.g., `gf_user`, `gf_group`)

### Import Patterns
- **Absolute imports** using `@/` alias for src directory
- **Barrel exports** from index files where appropriate
- **Type-only imports** when importing only types

### UI Component Patterns
- **shadcn/ui components** in `/src/components/ui` with consistent styling
- **CSS Variables** for theming with HSL color values
- **Tailwind CSS** with custom design tokens and animations
- **Responsive design** with mobile-first approach
- **Dark/light theme** support via next-themes