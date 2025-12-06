# EncounterAtlas

A comprehensive web application for managing D&D campaigns, encounters, characters, and NPCs. Built with modern web technologies for a smooth, interactive experience.

## Features

- **Campaign Management** - Organize and track your D&D campaigns
- **Character Sheets** - Create and manage party members with detailed information
- **NPC Directory** - Track all non-player characters in your world
- **Encounter Builder** - Design combat encounters with an interactive map system
- **Campaign Journal** - Document your campaign story and key events
- **Admin Authentication** - Secure login system for campaign management

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite for fast development and building
- Tailwind CSS for styling
- Radix UI for accessible component primitives
- React Query (TanStack Query) for data fetching and caching
- Wouter for lightweight routing

**Backend:**
- Express.js with TypeScript
- PostgreSQL database
- Drizzle ORM for type-safe database queries
- Zod for runtime schema validation

## Getting Started

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/EncounterAtlas.git
cd EncounterAtlas
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Edit .env with your database URL and other configuration
```

4. Push database schema
```bash
npm run db:push
```

### Development

Run the development server:
```bash
npm run dev
```

This starts the backend server. For frontend development:
```bash
npm run dev:client
```

### Building

Build for production:
```bash
npm run build
```

Start production server:
```bash
npm start
```

## Project Structure

```
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # React components (UI, admin, character, etc.)
│   │   ├── pages/          # Page components for routing
│   │   ├── context/        # React context for state management
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and query client
│   │   └── data/           # Mock/initial data
│   └── public/             # Static assets
├── server/                 # Express backend
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── static.ts          # Static file serving
├── shared/                # Shared code (schemas, types)
│   └── schema.ts          # Database schema and Zod validations
├── script/                # Build and utility scripts
└── attached_assets/       # Additional assets
```

## Available Scripts

- `npm run dev` - Start backend development server
- `npm run dev:client` - Start frontend Vite dev server (port 5000)
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run check` - Type check with TypeScript
- `npm run db:push` - Sync database schema

## Contributing

Contributions are welcome! Feel free to open issues and pull requests.

## License

MIT License - feel free to use this project for your own campaigns!

## Support

For questions or issues, please open an issue on GitHub.

---

Built with ❤️ for D&D enthusiasts
