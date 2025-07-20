# Technology Stack

## Framework & Runtime
- **Next.js 14.2.3** - React framework with App Router
- **React 18.3.1** - UI library
- **TypeScript 5.4.5** - Type-safe JavaScript
- **Node.js 20+** - Runtime environment

## Database & ORM
- **PostgreSQL** - Primary database
- **Drizzle ORM 0.30.10** - Type-safe database toolkit
- **Drizzle Kit 0.21.4** - Database migrations and introspection

## Authentication & Security
- **Arctic 2.3.1** - OAuth provider integration
- **@oslojs/crypto & @oslojs/encoding** - Cryptographic utilities
- **Zod 3.24.1** - Runtime type validation

## UI & Styling
- **Tailwind CSS 3.4.3** - Utility-first CSS framework
- **Radix UI** - Headless component primitives
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **next-themes** - Theme switching

## Forms & Data Handling
- **React Hook Form 7.51.5** - Form management
- **@hookform/resolvers** - Form validation
- **@tanstack/react-table** - Table management
- **ZSA (Zod Server Actions)** - Type-safe server actions

## Email & Communication
- **Resend 3.2.0** - Email delivery service
- **@react-email/components** - Email templates

## Development Tools
- **ESLint** - Code linting with Next.js and Prettier configs
- **Prettier** - Code formatting with Tailwind plugin
- **tsx** - TypeScript execution for scripts

## Common Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Database Operations
```bash
npm run db:generate  # Generate migration files
npm run db:push      # Push schema changes to database
npm run db:migrate   # Run pending migrations
npm run db:studio    # Open Drizzle Studio
npm run db:seed      # Seed database with initial data
npm run db:clear     # Clear all database data
npm run db:reset     # Clear and re-migrate database
```

## Environment Requirements
- **Node.js**: >= 20.0.0 < 21.0.0
- **pnpm**: >= 9.0.0 < 10.0.0 (preferred package manager)
- **PostgreSQL database** with connection string in DATABASE_URL