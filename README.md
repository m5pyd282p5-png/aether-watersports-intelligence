# Aether Chat

A production-ready full-stack chat application built on Cloudflare Workers with Durable Objects for scalable, multi-tenant storage. Features real-time chat boards, user management, and a modern React frontend with Shadcn UI.

[![[cloudflarebutton]]](https://deploy.workers.cloudflare.com/?url=${repositoryUrl})

## Features

- **Durable Objects for Entities**: One DO per User/ChatBoard with prefix-based indexes for efficient listing.
- **Real-time Chat**: Send and list messages per chat board with optimistic updates.
- **Modern UI**: Responsive design with Tailwind CSS, Shadcn UI components, dark mode, and smooth animations.
- **Type-safe API**: Shared types between frontend and worker, Hono routing, CORS enabled.
- **React Query Integration**: Infinite scrolling, caching, and mutations for seamless data flow.
- **Production Optimized**: TypeScript, Vite bundling, error boundaries, client error reporting.
- **Seed Data**: Mock users/chats/messages auto-seeded on first request.
- **Sidebar Layout**: Collapsible navigation with search (customizable).

## Tech Stack

- **Backend**: Cloudflare Workers, Durable Objects, Hono, TypeScript
- **Frontend**: React 18, Vite, React Router, Tanstack Query, Zustand, Framer Motion
- **UI/Design**: Shadcn UI, Tailwind CSS, Lucide Icons, Sonner Toasts
- **Data**: Shared types, Immer for state updates
- **Dev Tools**: Bun, ESLint, TypeScript 5

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (package manager & runtime)
- [Cloudflare Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- Cloudflare account (free tier sufficient)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Generate Worker types:
   ```bash
   bun run cf-typegen
   ```

### Local Development

- Start dev server (frontend + worker proxy):
  ```bash
  bun dev
  ```
- Open [http://localhost:3000](http://localhost:3000)
- API endpoints available at `/api/*`

### Build for Production

```bash
bun run build
```

## API Endpoints

All endpoints return `{ success: boolean; data?: T; error?: string }`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | List users (supports `?cursor` & `?limit`) |
| POST | `/api/users` | Create user `{ name: string }` |
| DELETE | `/api/users/:id` | Delete user |
| POST | `/api/users/deleteMany` | Delete multiple `{ ids: string[] }` |
| GET | `/api/chats` | List chats |
| POST | `/api/chats` | Create chat `{ title: string }` |
| GET | `/api/chats/:chatId/messages` | List messages |
| POST | `/api/chats/:chatId/messages` | Send message `{ userId: string; text: string }` |

See `worker/user-routes.ts` for implementation.

## Customization

- **Add Entities**: Extend `IndexedEntity` in `worker/entities.ts`, add routes in `worker/user-routes.ts`.
- **UI Changes**: Edit `src/pages/HomePage.tsx` or add routes in `src/main.tsx`.
- **Sidebar**: Customize `src/components/app-sidebar.tsx` or remove `AppLayout`.
- **Theme**: Toggle via `ThemeToggle`, CSS vars in `src/index.css`.

## Deployment

Deploy to Cloudflare Workers with a single command:

```bash
bun run deploy
```

This builds the frontend assets and deploys the Worker.

For custom configuration, edit `wrangler.jsonc`.

[![[cloudflarebutton]]](https://deploy.workers.cloudflare.com/?url=${repositoryUrl})

## Development Workflow

- **Hot Reload**: `bun dev` for frontend + worker.
- **Type Checking**: `bun tsc --noEmit`
- **Linting**: `bun lint`
- **Preview Production Build**: `bun preview`

## Architecture

```
Cloudflare Workers (Hono API)
├── GlobalDurableObject (KV-like storage)
├── Entities (UserEntity, ChatBoardEntity)
└── Indexes (sys-index-root)

React Frontend (Vite)
├── Tanstack Query (API client)
├── Shadcn UI + Tailwind
└── Shared types (shared/types.ts)
```

## Troubleshooting

- **Worker Routes Not Loading**: Check `worker/user-routes.ts` exports `userRoutes(app)`.
- **Durable Objects**: Ensure `wrangler.jsonc` migrations include your DO classes.
- **CORS Issues**: Enabled for `/api/*`.
- **Bun Issues**: Use `bun --bun` if needed.

## Contributing

1. Fork & clone
2. `bun install`
3. Create feature branch
4. `bun dev` & test
5. PR with clear description

## License

MIT